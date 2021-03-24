import styled from "styled-components";

export default styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  & input {
    width: 3em;
    font-size: inherit;
  }

  & > * + * {
    margin-left: 0.5rem;
  }
`;
