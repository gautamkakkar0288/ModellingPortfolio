import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('[main] Starting React app...');
const root = document.getElementById('root');
console.log('[main] Root element:', root);

try {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('[main] React rendered successfully');
} catch (error) {
  console.error('[main] Error rendering React:', error);
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error loading app: ' + error.message + '</div>';
} 
