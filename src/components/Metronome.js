import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import UIfx from "uifx";
import cowbell from "../assets/cowbell-pulse.wav";
import cowbellBar from "../assets/cowbell-bar.wav";

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
  const { tempo, metre, isPlaying } = useSelector((state) => state);
  const audioCtx = useRef(new AudioContext());
  const pulse = useRef(null);

  const startPulse = useCallback(() => {
    const interval = (60 / tempo) * 1000;

    setInterval(() => playTick(), interval);
  }, [tempo]);

  useEffect(() => {
    const getFile = async () => {
      const res = await fetch(cowbell);
      const arrayBuffer = await res.arrayBuffer();
      pulse.current = await audioCtx.current.decodeAudioData(arrayBuffer);

      console.log(pulse.current);
    };
    getFile();
  }, []);

  function playTick() {
    const source = audioCtx.current.createBufferSource();
    source.buffer = pulse.current;
    source.connect(audioCtx.current.destination);
    source.start(1);
    return source;
  }

  return (
    <Wrapper>
      <TempoDisplay>{tempo}bpm</TempoDisplay>
      <Pendulum isPlaying={isPlaying} tempo={tempo} />
      <button onClick={startPulse}>play</button>
    </Wrapper>
  );
};

export default Metronome;
