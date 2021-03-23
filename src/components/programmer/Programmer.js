import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromProgram } from "../../actions/programmerActions";
import ProgramForm from "./ProgramForm";

const Programmer = () => {
  const program = useSelector((state) => state.program);
  const dispatch = useDispatch();

  return (
    <div>
      {program.map((obj) => (
        <p key={obj.id}>
          {obj.measures} measures of {obj.metre} at {obj.tempo}bpm{" "}
          <button
            type="button"
            onClick={() => dispatch(removeFromProgram(obj))}
          >
            Remove
          </button>
        </p>
      ))}
      <ProgramForm />
    </div>
  );
};

export default Programmer;
