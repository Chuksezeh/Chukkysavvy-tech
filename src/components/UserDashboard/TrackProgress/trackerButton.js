import React, { useState } from 'react';

import TrackProgress from './trrackProgress';


const TrackBtn = () => {

const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className="app">
      {/* <TrackProgress currentStage={currentStage} /> */}
      <div className="controls">
        <button onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}>Previous</button>
        <button onClick={() => setCurrentStage(Math.min(4, currentStage + 1))}>Next</button>
      </div>
    </div>
  );
};

export default TrackBtn;