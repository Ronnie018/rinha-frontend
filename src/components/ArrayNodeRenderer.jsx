import { useState, Fragment, useContext } from 'react';
import JsonRenderer from './JsonRenderer';
import { StArrayNodeRenderer, StShowButton } from './StyledJsonViewer';
import { tooBigSize } from './bools';

import { ConfigContext } from '../App';

const ArrayNodeRenderer = ({ node, depth = 0 }) => {
  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const increaseFactor = 2;

  const { size } = useContext(ConfigContext);

  const [showSize, setShowSize] = useState(size);

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
                depth={depth + 1}
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
      {isNodeOpen && node.length > showSize && (
        <>
          <button onClick={() => setShowSize(showSize + increaseFactor)}>
            CLick to re-render bigger
          </button>

          <br />
        </>
      )}
      ]
    </StArrayNodeRenderer>
  );
};

export default ArrayNodeRenderer;
