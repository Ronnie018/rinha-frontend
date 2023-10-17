import react from 'react';
import styled from 'styled-components';

export const StString = styled.span`
  color: #444490;
  font-weight: bold;
`;

export const StNullish = styled.span`
  color: grey;
`;

export const StyledJsonRenderer = styled.div`
  padding: 0 1rem;

  &:not(.isBase) {
    border-left: 2px solid #bfbfbf;
  }

  .object-key {
    color: #4e9590;
  }

  .index-count {
    color: #bfbfbf;
  }
`;

export const JsonViewerContainer = styled.section`
  width: max-content;
  max-width: 100%;
  min-width: 250px;
  margin: 0 auto;
  font-family: 'jetBrains mono', monospace;
`;

export const StShowButton = styled.button`
  cursor: pointer;
  display: block;
  padding: 5px 0;
  margin: 0 auto;
`;

export const StArrayNodeRenderer = styled.span`
  .array-container {
    padding-left: 1rem;
    border-left: 2px solid #bfbfbf;
    .btn-open-node {
      background-color: #bfbfbf;
    }
  }
`;
