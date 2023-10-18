import { useState, Fragment, useContext } from 'react';

import { StArrayNodeRenderer, StShowButton } from './StyledJsonViewer';

import JsonRenderer from './JsonRenderer';
import { tooBigSize, increaseFactor } from './bools';

import Observable from './Observable';

import { ConfigContext } from '../Contexts';

function getPageScrollHeight() {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const pageScrollHeight = documentHeight - windowHeight;

  return pageScrollHeight;
}

const ArrayNodeRenderer = ({ node, depth = 0 }) => {
  // STATES
  const { size } = useContext(ConfigContext);

  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const [showSize, setShowSize] = useState(size);

  // LOCAL BOOLS
  const shoulShowObservable = isNodeOpen && node.length > showSize;
  const isBaseArray = depth < increaseFactor;
  const canDecrease = showSize >= size + increaseFactor;
  const isNotAtTheStart = shoulShowObservable && canDecrease && isBaseArray;
  const isNodeNotExpanded = !isNodeOpen && node.length > tooBigSize;

  function showNextItems() {
    setShowSize((vl) => vl + increaseFactor);
  }

  function showPreviousItems() {
    setShowSize((vl) => vl - increaseFactor);
  }

  const rangeMap = (array, callback, limit) => {
    const startValue = isBaseArray ? showSize - size : 0;
    const maxValue = Math.min(array.length, limit);

    const result = [];

    for (let i = startValue; i < maxValue; i++) {
      result.push(callback(array[i], i));
    }
    return result;
  };

  let lastSeen = null;

  return (
    <StArrayNodeRenderer>
      {isNotAtTheStart && (
        <StShowButton onClick={showPreviousItems}>Go Back</StShowButton>
      )}
      [
      <div className='array-container'>
        {rangeMap(
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
              {isNotAtTheStart && index % increaseFactor === 0 && (
                <Observable
                  cb={() => {
                    const pageScrollHeight = getPageScrollHeight();
                    if (window.scrollY < pageScrollHeight / 2) {
                      showPreviousItems();
                    }
                  }}
                />
              )}
            </Fragment>
          ),
          showSize
        )}
        {isNodeNotExpanded && (
          <StShowButton
            className='btn-open-node'
            onClick={() => setIsNodeOpen(!isNodeOpen)}
          >
            Show ({node.length})
          </StShowButton>
        )}
      </div>
      {shoulShowObservable && (
        <ShowMore cb={showNextItems} infinite={isBaseArray} />
      )}
      ]
    </StArrayNodeRenderer>
  );
};

function ShowMore({ cb, infinite = false }) {
  if (infinite) return <Observable cb={cb} />;

  return <StShowButton onClick={cb}>Show More</StShowButton>;
}

export default ArrayNodeRenderer;
