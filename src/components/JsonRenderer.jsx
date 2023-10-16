import { Fragment, useState } from 'react';
import {
  StNullish,
  StString,
  StyledJsonRenderer,
  StShowButton,
} from './StyledJsonViewer';
import { isArray, isObject } from './bools';
import ArrayNodeRenderer from './ArrayNodeRenderer';

const JsonRenderer = ({
  node,
  isBase = false,
  isNodeOpen = false,
  isNodeTooBig = false,
  index = null,
}) => {
  const [active, setActive] = useState(false);

  if (isNodeTooBig && !isNodeOpen) return;

  const OptionRenderer = () => {
    if (!node) return <StNullish className='nullish'>null</StNullish>;

    if (isObject(node))
      return (
        <ObjectNodeRenderer
          node={node}
          shouldLoad={isBase || active || isNodeOpen}
          isBase={isBase}
          toggle={() => setActive(!active)}
        />
      );

    if (isArray(node)) return <ArrayNodeRenderer node={node} />;

    return <StString>{node}</StString>;
  };

  return (
    <Fragment>
      {index !== null && <div className='index-count'>{index}</div>}
      <OptionRenderer />
    </Fragment>
  );
};

const ObjectNodeRenderer = ({
  node,
  shouldLoad = false,
  isBase = false,
  toggle,
}) => {
  if (shouldLoad) {
    return Object.entries(node).map(([key, value], index) => (
      <StyledJsonRenderer key={index} className={isBase && 'isBase'}>
        <span className='object-key'>{key}: </span>
        <JsonRenderer node={value} />
      </StyledJsonRenderer>
    ));
  }

  return <StShowButton onClick={toggle}>Show</StShowButton>;
};

export default JsonRenderer;
