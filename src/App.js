import React from "react";
import styled from "styled-components";
import Controls from "./components/Controls";
import Metronome from "./components/Metronome";
import Programmer from "./components/programmer/Programmer";
import GlobalStyle from "./GlobalStyle";

const MainWrapper = styled.div`
  width: 100%;
  margin: 3rem auto 0 auto;

  @media screen and (min-width: 600px) {
    width: 600px;
  }
`;

const App = () => {
  return (
    <MainWrapper>
      <GlobalStyle />
      <Metronome />
      <Controls />
      <Programmer />
    </MainWrapper>
  );
};

export default App;
