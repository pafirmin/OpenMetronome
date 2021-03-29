import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextProgramChunk } from "../../actions/metronomeActions";
import {
  clearProgram,
  removeFromProgram,
} from "../../actions/programmerActions";
import CustomProgramForm from "./CustomProgramForm";

const CustomProgram = () => {
  const { program, currentChunk } = useSelector((state) => state.program);
  const beatCount = useSelector((state) => state.metronome.beatCount);
  const dispatch = useDispatch();

  console.log(beatCount);

  const handleDelete = (obj) => {
    if (program.length === 1) {
      dispatch(clearProgram());
      return;
    }
    if (obj.id === currentChunk.id) {
      cycleProgram();
    }
    dispatch(removeFromProgram(obj));
  };

  const cycleProgram = useCallback(() => {
    const nextIndex = program.indexOf(currentChunk) + 1;
    const nextChunk = program[nextIndex] || program[0];

    dispatch(nextProgramChunk(nextChunk));
  }, [currentChunk, program, dispatch]);

  useEffect(() => {
    if (
      currentChunk &&
      beatCount === currentChunk.metre * currentChunk.measures
    ) {
      cycleProgram();
    }
  }, [beatCount, cycleProgram, currentChunk]);

  return (
    <div>
      <CustomProgramForm />
      {program.map((obj) => (
        <p style={{ textAlign: "center" }} key={obj.id}>
          {obj.measures} bars of {obj.metre} at {obj.tempo}bpm{" "}
          <button type="button" onClick={() => handleDelete(obj)}>
            Remove
          </button>
        </p>
      ))}
    </div>
  );
};

export default CustomProgram;
