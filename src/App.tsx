import React from 'react';
import './App.css';
import TimerCanvas from './TimerCanvas';

function App() {
  return (
    <>
      <div className="App">
        <TimerCanvas width={100} height={100} items={[ {sec: 20, color : "red"}, {sec:30, color: "green"} ]}/>
      </div>
      <div className="App">
          <TimerCanvas width={100} height={100} items={[ {sec: 2, color : "red"}, {sec:4, color: "green"}, {sec:2, color: "blue"} ]}/>
      </div>
    </>
  );
}

export default App;
