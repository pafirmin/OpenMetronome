import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMetre, setTempo, togglePlay } from "../actions/metronomeActions";
import Slider from "@material-ui/core/Slider";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";

const Wrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 100%;
`;

const MetreControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  margin: 0 auto;
`;

const StartBtn = styled.button`
  border-radius: 0;
  font-size: 1.6em;
  padding: 0.6rem 1rem;
  background: #425eca;
  font: inherit;
  color: inherit;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  width: 100px;

  &:hover {
    background: #33489b;
  }
`;

const Controls = () => {
  const { tempo, metre, isPlaying } = useSelector((state) => state.metronome);
  const dispatch = useDispatch();
  const [sliderVal, setSliderVal] = useState(tempo);

  const handleTempo = () => {
    dispatch(setTempo(sliderVal));
  };

  const incrementMetre = () => {
    dispatch(setMetre(metre + 1));
  };

  const decrementMetre = () => {
    dispatch(setMetre(metre - 1));
  };

  return (
    <Wrapper>
      <Slider
        value={sliderVal}
        min={50}
        max={218}
        onChange={(_e, newVal) => setSliderVal(newVal)}
        onChangeCommitted={handleTempo}
        valueLabelDisplay="auto"
        valueLabelFormat={sliderVal + " bpm"}
        color="secondary"
      />
      {/* <button onClick={() => dispatch(setMetre(7))}>Change metre</button> */}
      <StartBtn onClick={() => dispatch(togglePlay())}>
        {isPlaying ? "Stop" : "Start"}
      </StartBtn>
      <div style={{ width: "150px" }}>
        <span style={{ display: "block" }}>Metre</span>
        <MetreControl>
          <RemoveCircleOutlineRoundedIcon
            onClick={decrementMetre}
            role="button"
            aria-label="Decrement meter"
            style={{ fontSize: 40, cursor: "pointer" }}
          />
          <span>{metre}</span>
          <AddCircleOutlineIcon
            onClick={incrementMetre}
            role="button"
            aria-label="Increment meter"
            style={{ fontSize: 40, cursor: "pointer" }}
          />
        </MetreControl>
      </div>
    </Wrapper>
  );
};

export default Controls;
