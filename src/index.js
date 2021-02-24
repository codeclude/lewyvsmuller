import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './Ant';

ReactDOM.render(
  <React.StrictMode>
    <div style={{margin: 40}}>
      <h1>Lewy 20/21 vs Müller 71/72</h1>
      <Page />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals