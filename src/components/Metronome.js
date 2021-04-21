import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import Ticker from "../helpers/Ticker";
import {
  incrementBeatCount,
  resetBeatCount,
} from "../actions/metronomeActions";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
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
  const dispatch = useDispatch();
  const { tempo, metre, noteValue, isPlaying } = useSelector(
    (state) => state.metronome
  );
  const ticker = useRef(
    new Ticker({ onTick: () => dispatch(incrementBeatCount()) })
  );

  // Listen for tempo, metre and note value changes
  useEffect(() => {
    ticker.current.setTempo(tempo);
  }, [tempo]);

  useEffect(() => {
    ticker.current.setMetre(metre);
  }, [metre]);

  useEffect(() => {
    ticker.current.setNoteValue(noteValue);
  }, [noteValue]);

  /**
   * The call to setTimeout below is a temporary
   * workaround for the 1 or 2 beats that remain in
   * the buffer after the ticker stops
   */
  useEffect(() => {
    if (isPlaying) {
      ticker.current.init();
    } else if (ticker.current.stopPulse) {
      ticker.current.stopPulse();
      setTimeout(() => dispatch(resetBeatCount()), 1000);
    }
  }, [isPlaying, dispatch]);

  return (
    <Wrapper>
      <TempoDisplay>{tempo}bpm</TempoDisplay>
      <Pendulum isPlaying={isPlaying} tempo={tempo} />
    </Wrapper>
  );
};

export default Metronome;
