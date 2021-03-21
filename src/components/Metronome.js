import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { changeTempo } from "../actions/metronomeActions";

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

const animation = (props) =>
  css`
    animation: ${swing} ${(60 / props.tempo) * 2}s ease-in-out infinite;
  `;

const Pendulum = styled.div`
  width: 2px;
  height: 80%;
  position: absolute;
  left: 50%;
  bottom: 0;
  background-color: #000;
  transform-origin: bottom center;
  ${animation};
`;

const Metronome = () => {
  const tempo = useSelector((state) => state.tempo);
  const dispatch = useDispatch();
  console.log(tempo);

  return (
    <Wrapper>
      <Pendulum tempo={tempo} />
      <button onClick={() => dispatch(changeTempo(150))}>Increase tempo</button>
    </Wrapper>
  );
};

export default Metronome;
