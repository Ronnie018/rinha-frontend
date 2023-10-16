import { JsonViewerContainer } from './StyledJsonViewer';
import JsonRenderer from './JsonRenderer';
import { isArray } from './bools';

const JsonViewer = ({ json }) => {
  function RenderJson() {
    if (isArray(json)) {
      json.map((object) => {
        return <JsonRenderer node={object} isBase />;
      });
    }

    return <JsonRenderer node={json} isBase />;
  }
  return (
    <JsonViewerContainer>
      <RenderJson />
    </JsonViewerContainer>
  );
};

export default JsonViewer;
