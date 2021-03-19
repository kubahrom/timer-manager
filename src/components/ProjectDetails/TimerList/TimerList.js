import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimers } from '../../../redux/actions/timerActions';
import Timer from '../Timer/Timer';

const TimerList = ({ projectId }) => {
  const [openTimers, setOpenTimers] = useState([]);
  const [closedTimers, setClosedTimers] = useState([]);
  const { timers, notFound } = useSelector(state => state.timers);
  const dispatch = useDispatch();

  useEffect(() => {
    const test = timers.filter(timer => timer.projectId === projectId);
    if (
      (test.length === 0 && notFound !== projectId) ||
      (test.length === 0 && notFound === '')
    ) {
      dispatch(getTimers(projectId));
    } else if (notFound === projectId) {
      setOpenTimers([]);
      setClosedTimers([]);
    } else {
      setOpenTimers(
        timers.filter(
          timer => timer.isOpen === true && timer.projectId === projectId
        )
      );
      setClosedTimers(
        timers.filter(
          timer => timer.isOpen === false && timer.projectId === projectId
        )
      );
    }
  }, [dispatch, projectId, timers, notFound]);
  return (
    <>
      {openTimers.map(openTimer => (
        <Timer key={openTimer.id} timer={openTimer} />
      ))}
      Open timers
      <br />
      <pre>{JSON.stringify(openTimers, null, 2)}</pre>
      Closed timers
      <br />
      <pre>{JSON.stringify(closedTimers, null, 2)}</pre>
    </>
  );
};

export default TimerList;
