import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import Ticker from "../helpers/Ticker";
import { setTempo, setMetre } from "../actions/metronomeActions";

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: auto;
`;

const TempoDisplay = styled.span`
  display: block;
  font-size: 3rem;
  text-align: center;
`;

const swing = keyframes`
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(45deg);
  }
`;

const Pendulum = styled.div`
  width: 2px;
  height: 80%;
  position: absolute;
  left: 50%;
  bottom: 0;
  background-color: #c4c4c4;
  transform-origin: bottom center;
  animation: ${(props) =>
    props.isPlaying &&
    css`
      ${swing} ${60 / props.tempo}s linear infinite alternate
    `};

  &:after {
    content: "";
    position: absolute;
    top: ${(props) => ((props.tempo - 50) / 168) * 100}%;
    left: 50%;
    transform: translate(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #c4c4c4;
    transition: top 0.5s;
  }
`;

const Metronome = () => {
  const { tempo, metre, isPlaying } = useSelector((state) => state.metronome);
  // User defined metronome program
  const program = useSelector((state) => state.program);
  const dispatch = useDispatch();
  const [beatCount, setBeatCount] = useState(0);
  // Iterator object extracted from the current progeam
  const [routine, setRoutine] = useState();
  // Stores the settings for the current program chunk
  const [currProgramChunk, setCurrProgramChunk] = useState();
  const ticker = useRef(
    new Ticker({ onTick: () => setBeatCount((prev) => prev + 1) })
  );

  const initRoutine = useCallback(() => {
    const iterator = program[Symbol.iterator]();
    const chunk = iterator.next().value;
    setRoutine(iterator);
    updateChunk(chunk);
  }, [program, dispatch]);

  const updateChunk = useCallback((chunk) => {
    dispatch(setMetre(chunk.metre));
    dispatch(setTempo(chunk.tempo));
    setCurrProgramChunk(chunk);
  }, []);

  // Listen for tempo and metre changes
  useEffect(() => {
    ticker.current.setTempo(tempo);
    ticker.current.setMetre(metre);
  }, [tempo, metre]);

  useEffect(() => {
    if (program.length > 0) {
      initRoutine();
    }
  }, [program, initRoutine]);

  //Listen for end of current program chunk
  useEffect(() => {
    if (
      currProgramChunk &&
      beatCount === currProgramChunk.metre * currProgramChunk.measures
    ) {
      setBeatCount(0);
      const nextChunk = routine.next().value;
      if (nextChunk) {
        updateChunk(nextChunk);
      } else {
        initRoutine();
      }
    }
  }, [currProgramChunk, beatCount, initRoutine, routine, updateChunk]);
  /*
   * The call to setTimeout below is a temporary
   * workaround for the 1 or 2 beats that remain in
   * the buffer after the ticker stops
   */
  useEffect(() => {
    if (isPlaying) {
      ticker.current.init();
    } else if (ticker.current.stopPulse) {
      ticker.current.stopPulse();
      setTimeout(() => setBeatCount(0), 1000);
    }
  }, [isPlaying]);

  return (
    <Wrapper>
      <p>{beatCount % metre || metre}</p>
      <TempoDisplay>{tempo}bpm</TempoDisplay>
      <Pendulum isPlaying={isPlaying} tempo={tempo} />
    </Wrapper>
  );
};

export default Metronome;
