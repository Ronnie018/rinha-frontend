import { useState } from 'react';
import Viewer from './pages/Viewer';
import Upload from './pages/Upload';
import "./App.css"

function App() {
  let [file, setFile] = useState(null);
  let [fileName, setFileName] = useState(null);

  if (file) return <Viewer file={file} fileName={fileName}/>;

  return <Upload setFile={setFile} setFileName={setFileName} />;
}

export default App;
