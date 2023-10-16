import { useState, Fragment } from 'react';
import JsonRenderer from './JsonRenderer';
import { StArrayNodeRenderer, StShowButton } from './StyledJsonViewer';
import { tooBigSize } from './bools';

const ArrayNodeRenderer = ({ node }) => {
  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const increaseFactor = 2;
  const [showSize, setShowSize] = useState(50);
  const [data, setData] = useState([]);

  const limitedMap = (array, callback, limit) => {
    const result = [];
    for (let i = 0; i < Math.min(array.length, limit); i++) {
      result.push(callback(array[i], i));
    }
    return result;
  };

  return (
    <StArrayNodeRenderer>
      [
      <div className='array-container'>
        {limitedMap(
          node,
          (value, index) => (
            <Fragment key={index}>
              <JsonRenderer
                node={value}
                isNodeOpen={isNodeOpen}
                isNodeTooBig={node.length > tooBigSize}
                index={index}
              />
            </Fragment>
          ),
          showSize
        )}
        {!isNodeOpen && node.length > tooBigSize && (
          <StShowButton
            className='btn-open-node'
            onClick={() => setIsNodeOpen(!isNodeOpen)}
          >
            Show ({node.length})
          </StShowButton>
        )}
      </div>
      ]
      {isNodeOpen && node.length > showSize && (
        <button onClick={() => setShowSize(showSize + increaseFactor)}>
          CLick to rerender bigger
        </button>
      )}
    </StArrayNodeRenderer>
  );
};

export default ArrayNodeRenderer;
