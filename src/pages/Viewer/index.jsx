import { useState, useMemo } from 'react';
import JsonViewer from '../../components/JsonViewer';
import StViewer, { StConfig } from './styled';
import { ConfigContext } from '../../Contexts';

const Viewer = ({ file, fileName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [configVariables, setConfigVariables] = useState({
    depth: 5,
    size: 10,
  });

  // Memoize the JsonViewer component
  const memoizedJsonViewer = useMemo(() => <JsonViewer json={file} />, [file]);

  return (
    <ConfigContext.Provider value={configVariables}>
      <StViewer>
        <main>
          <h2 className='filename'>{fileName}</h2>
          {file && memoizedJsonViewer}
        </main>
        <StConfig
          title='Config'
          aria-description='change how the data is displayed by default'
        >
          <button
            onClick={(value) => setMenuOpen((value) => !value)}
            aria-description={'open/close menu'}
          >
            {menuOpen ? 'close' : 'open'}
          </button>
          {menuOpen && (
            <div className='opt' aria-label='config'>
              <div className='input-group'>
                <label
                  htmlFor='depth'
                  aria-description='change depth of the tree to be rendered'
                >
                  Depth
                </label>
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
                <label
                  htmlFor='size'
                  aria-description='change how many elements of an array will be rendered'
                >
                  Size
                </label>
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
            </div>
          )}
        </StConfig>
      </StViewer>
    </ConfigContext.Provider>
  );
};

export default Viewer;
