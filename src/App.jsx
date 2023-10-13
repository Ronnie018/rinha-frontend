import { useRef, useState } from 'react';
import './App.css';
import JsonViewer from './components/JsonViewer';

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
        prepareJSON(file);
      } catch (e) {
        console.log('arquivo invalido');
        inputRef.current.value = '';
      }
    };
  }

  function prepareJSON(file) {
    setFile(file);
  }

  return (
    <>
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

      <div>
        {file && <JsonViewer json={file}></JsonViewer>}
      </div>
    </>
  );
}

export default App;
