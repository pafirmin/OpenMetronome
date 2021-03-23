import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToProgram } from "../../actions/programmerActions";
import { v4 as uuid } from "uuid";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
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
    e.preventDefault();
    dispatch(
      addToProgram({
        ...formValues,
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
      <label htmlFor="measures">
        <input
          type="number"
          name="measures"
          id="measures"
          value={formValues.measures}
          onChange={handleChange}
        />
        measures of
      </label>
      <label htmlFor="metre">
        <input
          type="number"
          name="metre"
          id="metre"
          value={formValues.metre}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="tempo">
        at
        <input
          type="number"
          min={60}
          max={220}
          name="tempo"
          id="tempo"
          value={formValues.tempo}
          onChange={handleChange}
        />
        bpm
      </label>
      <button>Add</button>
    </StyledForm>
  );
};

export default ProgramForm;
