import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss'
import {NotesProvider} from "./notesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NotesProvider>
          <App />
      </NotesProvider>
  </React.StrictMode>
);
