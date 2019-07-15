import React from 'react';
import './App.scss';
import TableComp from './components/table/Table';

function App() {
  return (
    <div className="App">
      <h1 className="title" style={{ textAlign: "center" }}>My schedule app</h1>
      <TableComp />
    </div>
  );
}

export default App;
