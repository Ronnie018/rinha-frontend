import React, { useRef, useState } from 'react';
import StUpload from './styled';

const Upload = ({ setFile, setFileName }) => {
  const inputRef = useRef(null);
  const [err, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(e) {
    setIsLoading(() => true);
    const file = e.target.files[0];
    setFileName(() => file.name);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const file = JSON.parse(reader.result);
        setFile(() => file);
        setError(() => null);
        setIsLoading(() => false);
      } catch (e) {
        inputRef.current.value = '';
        setFileName(() => null);
        setError(() => 'Invalid file. Please load a valid JSON file.');
        setIsLoading(() => false);
      }
    };
  }

  return (
    <StUpload>
      <div className='container'>
        <h1>JSON Tree Viewer</h1>

        <p>
          Simple JSON Viewer that runs completely on-client. No data exchange.
        </p>

        <label htmlFor='json' onClick={() => inputRef.current.click()}>
          <button>Load JSON</button>
          <input
            ref={inputRef}
            type='file'
            name='json'
            id='json'
            accept='.json'
            onChange={handleFileChange}
          />
        </label>
        {isLoading && <p className='msg loading'>Loading...</p>}

        {err && <p className='msg error'>{err}</p>}
      </div>
    </StUpload>
  );
};

export default Upload;
