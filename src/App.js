import React from "react";
import Controls from "./components/Controls";
import Metronome from "./components/Metronome";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Metronome />
      <Controls />
    </div>
  );
};

export default App;
