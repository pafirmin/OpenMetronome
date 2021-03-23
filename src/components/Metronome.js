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
  const dispatch = useDispatch();
  const program = useSelector((state) => state.program);
  const [beatCount, setBeatCount] = useState(0);
  const [routine, setroutine] = useState();
  const [currProgramChunk, setCurrProgramChunk] = useState();
  const ticker = useRef(
    new Ticker({ onTick: () => setBeatCount((prev) => prev + 1) })
  );

  // Listen for tempo and metre changes
  useEffect(() => {
    ticker.current.setTempo(tempo);
    ticker.current.setMetre(metre);
  }, [tempo, metre]);

  // Extract iterator from program routine
  useEffect(() => {
    if (program.length > 0) {
      const iterator = program[Symbol.iterator]();
      setroutine(iterator);
      setCurrProgramChunk(iterator.next().value);
    }
  }, [program]);

  //Listen for end of current program chunk
  useEffect(() => {
    const handleTick = () => {
      const nextStep = routine.next().value;
      if (nextStep) {
        dispatch(setTempo(nextStep.tempo));
        dispatch(setMetre(nextStep.metre));
        setBeatCount(0);
        setCurrProgramChunk(nextStep);
      }
    };
    if (
      currProgramChunk &&
      beatCount === currProgramChunk.measures * currProgramChunk.metre
    ) {
      handleTick();
    }
  }, [beatCount, currProgramChunk, dispatch, routine]);

  useEffect(() => {
    if (isPlaying) {
      ticker.current.init();
    } else if (ticker.current.stopPulse) {
      ticker.current.stopPulse();
      setBeatCount(0);
    }
  }, [isPlaying]);

  return (
    <Wrapper>
      <p>{beatCount}</p>
      <TempoDisplay>{tempo}bpm</TempoDisplay>
      <Pendulum isPlaying={isPlaying} tempo={tempo} />
      {/* <button onClick={playTick}>play</button> */}
    </Wrapper>
  );
};

export default Metronome;
