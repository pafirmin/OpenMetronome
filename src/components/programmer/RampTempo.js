import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTempo } from "../../actions/metronomeActions";
import ProgramForm from "../styled-components/ProgramForm";

const RampTempo = () => {
  const { tempo, metre, beatCount, isPlaying } = useSelector(
    (state) => state.metronome
  );
  const dispatch = useDispatch();
  const [tempoRamp, setTempoRamp] = useState(10);
  const [rampFrequency, setRampFrequency] = useState(4);

  useEffect(() => {
    if (
      isPlaying &&
      beatCount % (rampFrequency * metre) === 0 &&
      tempo <= 220 - tempoRamp
    ) {
      dispatch(setTempo(tempo + tempoRamp));
    }
  }, [beatCount]);

  return (
    <div>
      <ProgramForm>
        <label htmlFor="tempo">Increase tempo by</label>
        <input
          type="number"
          name="tempoRamp"
          id="tempo"
          value={tempoRamp}
          onChange={(e) => setTempoRamp(e.target.value)}
        />
        <span>bpm every</span>
        <input
          type="number"
          name="measures"
          id="measures"
          value={rampFrequency}
          onChange={(e) => setRampFrequency(e.target.value)}
        />
        <label htmlFor="measures">measures</label>
      </ProgramForm>
    </div>
  );
};

export default RampTempo;
