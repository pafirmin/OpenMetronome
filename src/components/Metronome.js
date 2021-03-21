import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import cowbell from "../assets/cowbell_2.wav";

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin: auto;
`;

const swing = keyframes`
  0%, 100% {
    transform: rotate(45deg); 
  }
  50% {
    transform: rotate(-45deg)
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
  ${(props) => css`
    animation: ${swing} ${(60 / props.tempo) * 2}s ease-in-out infinite;
  `};
`;

const Metronome = () => {
  const tempo = useSelector((state) => state.tempo);
  const audioRef = useRef(null);
  const stopAudio = useRef(() => {});
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    const interval = (60 / tempo) * 1000;
    const audioLoop = setInterval(() => audioRef.current.play(), interval);

    return () => clearInterval(audioLoop);
  };

  const onPlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      stopAudio.current = playAudio();
    } else {
      setIsPlaying(false);
      stopAudio.current();
    }
  };

  return (
    <Wrapper>
      <button onClick={onPlay} />
      <audio ref={audioRef} src={cowbell} preload="auto" />
      <Pendulum tempo={tempo} />
    </Wrapper>
  );
};

export default Metronome;
