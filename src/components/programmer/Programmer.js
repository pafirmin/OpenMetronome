import React, { useState } from "react";
import styled from "styled-components";
import CustomProgram from "./CustomProgram";
import RampTempo from "./RampTempo";

const TabbedNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const Tab = styled.span`
  border-bottom: 2px solid #d3d3d3;
  width: 200px;
  text-align: center;
  padding-bottom: 0.3rem;
  position: relative;
  color: ${(props) => (props.isActive ? "#dfdfdf" : "#9d9d9d")};
  cursor: pointer;
  transition: color 0.3s;

  &:after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: ${(props) => (props.isActive ? "100%" : "0")};
    background-color: red;
    transition: width 0.3s;
  }
`;

const Programmer = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div style={{ marginTop: "2rem" }}>
      <TabbedNav>
        <Tab isActive={activeTab === 1} onClick={() => setActiveTab(1)}>
          Tempo ramp
        </Tab>
        <Tab isActive={activeTab === 2} onClick={() => setActiveTab(2)}>
          Custom
        </Tab>
      </TabbedNav>
      {activeTab === 1 && <RampTempo />}

      {activeTab === 2 && <CustomProgram />}
    </div>
  );
};

export default Programmer;
