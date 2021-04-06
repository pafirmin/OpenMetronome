import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  setMetre,
  setNoteValue,
  setTempo,
  togglePlay,
} from "../actions/metronomeActions";
import Slider from "@material-ui/core/Slider";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@material-ui/icons/RemoveCircleOutlineRounded";

const Wrapper = styled.div`
  margin: 1rem auto 0 auto;
  text-align: center;
  width: 100%;
`;

const ControlContainer = styled.div`
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

const NoteValue = styled.span`
  font-size: 1.8em;
  cursor: pointer;
  color: ${(props) => (props.selected ? "red" : "inherit")};
`;

const Controls = () => {
  const { tempo, metre, noteValue, isPlaying } = useSelector(
    (state) => state.metronome
  );
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

  const setQuarterNote = () => {
    dispatch(setNoteValue(1));
  };

  const setEighthNote = () => {
    dispatch(setNoteValue(0.5));
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
      <StartBtn onClick={() => dispatch(togglePlay())}>
        {isPlaying ? "Stop" : "Start"}
      </StartBtn>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div style={{ width: "150px" }}>
          <span style={{ display: "block" }}>Metre</span>
          <ControlContainer>
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
          </ControlContainer>
        </div>
        <div style={{ width: "150px" }}>
          <span style={{ display: "block" }}>Note</span>
          <ControlContainer>
            <NoteValue
              onClick={setQuarterNote}
              role="button"
              aria-label="Quarter note pulse"
              selected={noteValue === 1}
            >
              ♩
            </NoteValue>
            <NoteValue
              onClick={setEighthNote}
              role="button"
              aria-label="Eighth note pulse"
              selected={noteValue === 0.5}
            >
              ♫
            </NoteValue>
          </ControlContainer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Controls;
