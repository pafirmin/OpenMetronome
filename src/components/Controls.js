import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMetre, setTempo, togglePlay } from "../actions/metronomeActions";
import Slider from "@material-ui/core/Slider";

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 500px;
`;

const Controls = () => {
  const { tempo, isPlaying } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [sliderVal, setSliderVal] = useState(tempo);

  const handleTempo = () => {
    dispatch(setTempo(sliderVal));
  };

  return (
    <Wrapper>
      <Slider
        value={sliderVal}
        min={50}
        max={220}
        onChange={(e, newVal) => setSliderVal(newVal)}
        onChangeCommitted={handleTempo}
        valueLabelDisplay="auto"
        valueLabelFormat={sliderVal}
      />
      <button onClick={() => dispatch(setMetre(7))}>Change metre</button>
      <button onClick={() => dispatch(togglePlay())}>Start</button>
    </Wrapper>
  );
};

export default Controls;
