import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimers } from '../../../redux/actions/timerActions';
import Timer from '../Timer/Timer';
import TimerTable from '../TimerTable/TimerTable';

const TimerList = ({ projectId }) => {
  const [openTimers, setOpenTimers] = useState([]);
  const [closedTimers, setClosedTimers] = useState([]);
  const { timers, notFound } = useSelector(state => state.timers);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadedTimers = timers.filter(timer => timer.projectId === projectId);
    if (
      (loadedTimers.length === 0 && notFound !== projectId) ||
      (loadedTimers.length === 0 && notFound === '')
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
      <TimerTable timers={closedTimers} />
    </>
  );
};

export default TimerList;
