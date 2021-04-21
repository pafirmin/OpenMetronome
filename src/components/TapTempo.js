import React, { useState } from "react";
import { setTempo } from "../actions/metronomeActions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const TapBtn = styled.button`
  width: 100px;
  height: 100px;
  font-size: 1.1em;
  border: 2px solid #fff;
  color: #fff;
  background-color: #575757;
  cursor: pointer;
  border-radius: 50%;
`;

const TapTempo = () => {
  const { REACT_APP_MIN_TEMPO, REACT_APP_MAX_TEMPO } = process.env;
  const [reference, setReference] = useState();
  const dispatch = useDispatch();

  const handleTap = () => {
    const time = performance.now();

    if (reference) {
      const interval = time - reference;
      let newTempo = Math.round(60 / (interval / 1000));

      if (newTempo > REACT_APP_MAX_TEMPO) {
        newTempo = REACT_APP_MAX_TEMPO;
      } else if (newTempo < REACT_APP_MIN_TEMPO) {
        newTempo = REACT_APP_MIN_TEMPO;
      }

      dispatch(setTempo(newTempo));
    }
    setReference(time);
  };

  return (
    <div>
      <TapBtn onClick={handleTap}>Tap Tempo</TapBtn>
    </div>
  );
};

export default TapTempo;
