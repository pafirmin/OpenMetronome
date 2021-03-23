import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToProgram } from "../../actions/programmerActions";
import { v4 as uuid } from "uuid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 1.4rem;

  & input {
    width: 3em;
    font-size: inherit;
  }

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const AddBtn = styled.button`
  background: transparent;
  border: none;
  color: inherit;
`;

const ProgramForm = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    measures: 4,
    metre: 4,
    tempo: 120,
    silent: false,
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(
      addToProgram({
        measures: Number(formValues.measures),
        metre: Number(formValues.metre),
        tempo: Number(formValues.tempo),
        silent: formValues.silent,
        id: uuid(),
      })
    );
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="number"
        name="measures"
        id="measures"
        value={formValues.measures}
        onChange={handleChange}
      />
      <label htmlFor="measures">measures of</label>
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
    </StyledForm>
  );
};

export default ProgramForm;
