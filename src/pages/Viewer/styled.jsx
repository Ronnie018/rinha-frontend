import react from 'react';
import styled from 'styled-components';

const StViewer = styled.div`
  font-family: 'Inter', sans-serif;

  display: flex;
  flex-wrap: wrap;

  max-width: 100%;

  .filename {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  min-height: 100vh;

  width: 700px;
  margin: 0 auto;
  overflow-x: scroll;

  @media (max-width: 480px) {
    justify-content: start;
    .filename {
      font-size: 1.5rem;
      width: max-content;
      margin: 0 auto 1rem;
    }
  }
`;

export const StConfig = styled.div`
  display: flex;
  display: none;
  flex-direction: column;
  background-color: #333333;
  position: fixed;
  top: 0;
  right: 0;
  font-size: 1.5rem;
  padding: 1rem;
  color: white;
  .input-group {
    display: flex;
    flex-direction: column;

    input {
      padding: 0.5rem;
      height: 2rem;
    }
  }
`;

export default StViewer;
