import React from 'react';
import './App.css';
import TimerCanvas from './TimerCanvas';

function App() {
  return (
    <>
      <div className="App">
        <TimerCanvas width={100} height={100} items={[ {sec: 20}, {sec:30} ]}/>
      </div>
      <div className="App">
          <TimerCanvas width={100} height={100} items={[ {sec: 10}, {sec:30} ]}/>
      </div>
    </>
  );
}

export default App;
