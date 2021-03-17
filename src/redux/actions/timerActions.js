import firebase from '../../firebase/firebase';

//Actions
export const ADD_TIMER = 'add_timer';
export const SET_TIMERS = 'set_timers';
export const DELETE_TIMER = 'delete_timer';
export const UPDATE_TIMER = 'update_timer';
export const TIMER_ERROR = 'timer_error';

//Set timer action creator
const setTimers = payload => ({ type: SET_TIMERS, payload });

//Add timer action creator
const addTimer = payload => ({ type: ADD_TIMER, payload });

//Timer error action creator
const timerError = payload => ({ type: TIMER_ERROR, payload });

//Delete timer action creator
const deleteTimer = payload => ({ type: DELETE_TIMER, payload });

//Update timer action creator
const updateTimerActionCreator = payload => ({ type: UPDATE_TIMER, payload });

export const getTimers = projectId => async dispatch => {
  try {
    const ref = firebase.firestore().collection('timers');
    const res = await ref.where('projectId', '==', projectId).get();
    const data = await res.docs.map(doc => doc.data());
    if (data.length !== 0) {
      dispatch(setTimers(data));
    } else {
      dispatch(timerError('not-found'));
    }
  } catch (err) {
    console.error(err);
  }
};

export const createNewTimer = timer => async dispatch => {
  try {
    const ref = firebase.firestore().collection('timers');
    await ref.doc(timer.id).set(timer);
    dispatch(addTimer(timer));
  } catch (err) {
    console.error(err);
  }
};

export const deleteTimerById = timerId => async dispatch => {
  try {
    const ref = firebase.firestore().collection('timers');
    await ref.doc(timerId).delete();
    await dispatch(deleteTimer(timerId));
  } catch (err) {
    console.error(err);
  }
};

export const updateTimer = updatedTimer => async dispatch => {
  try {
    const ref = firebase.firestore().collection('timers');
    await ref
      .doc(updatedTimer.id)
      .update
      // TODO
      ();
    dispatch(updateTimerActionCreator(updatedTimer));
  } catch (err) {
    console.error(err);
  }
};
