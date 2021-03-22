import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes, css } from "styled-components";
import cowbell from "../assets/cowbell-pulse.wav";
import cowbellBar from "../assets/cowbell-bar.wav";

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: auto;
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
  background-color: #000;
  transform-origin: bottom center;
  animation: ${(props) =>
    props.isPlaying &&
    css`
      ${swing} ${60 / props.tempo}s linear infinite alternate
    `};
`;

const Metronome = () => {
  const { tempo, metre, isPlaying } = useSelector((state) => state);
  const pulseRef = useRef(null);
  const newBarRef = useRef();
  const stopAudio = useRef(() => {});
  const [beatCount, setBeatCount] = useState(1);

  const startPulse = useCallback(() => {
    stopAudio.current();
    const interval = (60 / tempo) * 1000;

    const pulse = setInterval(() => setBeatCount((prev) => prev + 1), interval);

    stopAudio.current = () => clearInterval(pulse);
  }, [tempo]);

  useEffect(() => {
    setBeatCount(1);

    if (isPlaying) {
      startPulse();
    } else {
      stopAudio.current();
    }
  }, [isPlaying, tempo, startPulse]);

  useEffect(() => {
    if (isPlaying) {
      if (beatCount % metre === 1) {
        newBarRef.current.play();
      } else {
        pulseRef.current.play();
      }
    }
  }, [isPlaying, beatCount, metre]);

  return (
    <Wrapper>
      <p>{tempo}</p>
      <p>{beatCount % metre || metre}</p>
      <audio ref={newBarRef} src={cowbellBar} preload="auto" />
      <audio ref={pulseRef} src={cowbell} preload="auto" />
      <Pendulum isPlaying={isPlaying} tempo={tempo} />
    </Wrapper>
  );
};

export default Metronome;
