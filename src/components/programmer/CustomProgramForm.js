import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToProgram } from "../../actions/programmerActions";
import { v4 as uuid } from "uuid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { nextProgramChunk } from "../../actions/metronomeActions";
import ProgramForm from "../styled-components/ProgramForm";

const CustomProgramForm = () => {
  const { program } = useSelector((state) => state.program);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    measures: 4,
    metre: 4,
    tempo: 120,
    silent: false,
  });

  const handleSubmit = () => {
    const settings = {
      measures: Number(formValues.measures),
      metre: Number(formValues.metre),
      tempo: Number(formValues.tempo),
      silent: formValues.silent,
      id: uuid(),
    };
    if (program.length === 0) {
      dispatch(nextProgramChunk(settings));
    }
    dispatch(addToProgram(settings));
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ProgramForm onSubmit={handleSubmit}>
      <input
        type="number"
        name="measures"
        id="measures"
        value={formValues.measures}
        onChange={handleChange}
      />
      <label htmlFor="measures">bars of</label>
      <label htmlFor="metre">
        <input
          type="number"
          name="metre"
          id="metre"
          value={formValues.metre}
          onChange={handleChange}
        />
      </label>
      <span>at</span>
      <input
        type="number"
        min={60}
        max={220}
        name="tempo"
        id="tempo"
        value={formValues.tempo}
        onChange={handleChange}
      />
      <label htmlFor="tempo">bpm</label>
      <AddCircleOutlineIcon
        role="button"
        onClick={handleSubmit}
        aria-label="Add to program"
        style={{ fontSize: 30, cursor: "pointer" }}
      />
    </ProgramForm>
  );
};

export default CustomProgramForm;
