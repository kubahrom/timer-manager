import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';
const TimerTest = ({ created }) => {
  const [differenceInSeconds, setDifferenceInSeconds] = useState(0);
  const [interv, setInterv] = useState();
  const [startBtn, setStartBtn] = useState(false);
  const dateCreated = new Date(created);

  const handleStartTimer = () => {
    setInterv(setInterval(run, 1000));
    setStartBtn(true);
  };

  const handleStopTimer = () => {
    setInterv(clearInterval(interv));
    setStartBtn(false);
  };

  const run = () => {
    const dateNow = new Date();
    const difference = Math.ceil((dateNow - dateCreated) / 1000);
    setDifferenceInSeconds(difference);
  };

  useEffect(() => {
    return () => {
      setInterv(clearInterval(interv));
    };
    //eslint-disable-next-line
  }, []);

  // console.log(differenceInSeconds);
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Timer</h1>
      {differenceInSeconds}
      <Button
        variant="contained"
        disabled={startBtn}
        onClick={() => handleStartTimer()}
      >
        Start
      </Button>
      <Button
        variant="contained"
        disabled={!startBtn}
        onClick={() => handleStopTimer()}
      >
        Stop
      </Button>
    </div>
  );
};

export default TimerTest;
