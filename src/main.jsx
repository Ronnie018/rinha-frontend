import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Contexts from './Contexts.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </React.StrictMode>
);
