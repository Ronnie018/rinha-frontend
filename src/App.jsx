import { useRef, useState, createContext } from 'react';
import './App.css';
import JsonViewer from './components/JsonViewer';
import StApp, { StConfig } from './app.styled';

export const ConfigContext = createContext({});

function App() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  function hanfdleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const file = JSON.parse(reader.result);
        setFile(() => file);
      } catch (e) {
        console.log('arquivo invalido');
        inputRef.current.value = '';
      }
    };
  }

  const [configVariables, setConfigVariables] = useState({
    depth: 5,
    size: 50,
  });

  return (
    <ConfigContext.Provider value={configVariables}>
      <StApp>
        <form action='/'>
          <input
            ref={inputRef}
            type='file'
            name='json'
            id='json'
            accept='.json'
            onChange={hanfdleFileChange}
          />
        </form>

        <div>{file && <JsonViewer json={file} />}</div>

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
      </StApp>
    </ConfigContext.Provider>
  );
}

export default App;
