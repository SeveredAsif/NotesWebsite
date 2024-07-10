import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import NoteList from './NoteList'; // Import the NotesList component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <NoteList /> {/* Add the NotesList component here */}
  </React.StrictMode>
);
