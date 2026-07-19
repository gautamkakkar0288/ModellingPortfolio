import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('[v0] Main.jsx loaded');

try {
  console.log('[v0] About to render App');
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[v0] App rendered successfully');
} catch (error) {
  console.error('[v0] Render error:', error);
  document.body.innerHTML = `<pre style="color: red; padding: 20px;">Error: ${error.message}\n\n${error.stack}</pre>`;
} 
