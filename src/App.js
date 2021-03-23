import React from "react";
import Controls from "./components/Controls";
import Metronome from "./components/Metronome";
import Programmer from "./components/programmer/Programmer";
import GlobalStyle from "./GlobalStyle";

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Metronome />
      <Controls />
      <Programmer />
    </div>
  );
};

export default App;
