import styled from 'styled-components';

const StUpload = styled.div`
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  max-width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;

  text-align: center;

  .container {
    display: flex;
    flex-direction: column;
    row-gap: 1.8rem;
  }

  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.5rem;
  }

  button {
    padding: 0.6rem 0.8rem;
    color: #666;
    border-radius: 0.3rem;
    border: 1px solid #888;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    visibility: hidden;
  }

  .msg {
    font-size: 1.2rem;
    &.error {
      color: #bf0e0e;
    }
    &.loading {
      color: #1b8aa8;
    }
  }
`;

export default StUpload;
