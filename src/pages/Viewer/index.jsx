import { useRef, useState, createContext } from 'react';
import JsonViewer from '../../components/JsonViewer';
import StViewer, { StConfig } from './styled';

export const ConfigContext = createContext({});

const Viewer = ({ file, fileName }) => {
  const [configVariables, setConfigVariables] = useState({
    depth: 3,
    size: 2,
  });

  return (
    <ConfigContext.Provider value={configVariables}>
      <StViewer>
        <div>
          <h2 className='filename'>{fileName}</h2>
          {file && <JsonViewer json={file} />}
        </div>

        <StConfig>
          <div className='input-group'>
            <label htmlFor='depth'>Depth</label>
            <input
              type='number'
              name='depth'
              id='depth'
              min={1}
              value={configVariables.depth}
              onChange={(e) => {
                if (e.target.value < 1 || e.target.value > 10) return;
                setConfigVariables((prev) => ({
                  ...prev,
                  depth: e.target.value,
                }));
              }}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='size'>Size</label>

            <input
              type='number'
              name='size'
              id='size'
              min={1}
              value={configVariables.size}
              onChange={(e) => {
                if (e.target.value < 1 || e.target.value > 100) return;
                setConfigVariables((prev) => ({
                  ...prev,
                  size: e.target.value,
                }));
              }}
            />
          </div>
        </StConfig>
      </StViewer>
    </ConfigContext.Provider>
  );
};

export default Viewer;
