const JsonViewer = ({ json }) => {
  if (Array.isArray(json)) {
    return (
      <ul style={{ marginLeft: '1rem' }}>
        {json.map((item, index) => {
          return <JsonNode key={index} node={item} />;
        })}
      </ul>
    );
  } else {
    return <JsonNode>{JSON.stringify(json, null, 2)}</JsonNode>;
  }
};

const JsonNode = ({ node }) => {
  return (
    <ul>
      {Object.entries(node).map(([key, value]) => {
        return (
          <li key={key}>
            <span style={{ fontWeight: 'bold' }}>{key}: </span>
            {typeof value === 'object' ? <JsonNode node={value} /> : value}
          </li>
        );
      })}
    </ul>
  );
};


export default JsonViewer;
