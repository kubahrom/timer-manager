import firebase from "../../firebase/firebase";

//Actions
export const ADD_TIMER = "add_timer";
export const SET_TIMERS = "set_timers";
export const DELETE_TIMER = "delete_timer";
export const DELETE_TIMERS = "delete_timers";
export const UPDATE_TIMER = "update_timer";
export const TIMER_ERROR = "timer_error";
export const CLEAR_TIMERS = "clear_timers";

//Set timer action creator
const setTimers = (payload) => ({ type: SET_TIMERS, payload });

//Add timer action creator
const addTimer = (payload) => ({ type: ADD_TIMER, payload });

//Timer error action creator
const timerError = (payload) => ({ type: TIMER_ERROR, payload });

//Delete timer action creator
const deleteTimer = (payload) => ({ type: DELETE_TIMER, payload });

//Delete timers action creator
const deleteTimers = (payload) => ({ type: DELETE_TIMERS, payload });

//Delete timers action creator
export const clearTimers = () => ({ type: CLEAR_TIMERS });

//Update timer action creator
const updateTimerActionCreator = (payload) => ({ type: UPDATE_TIMER, payload });

export const getTimers = (projectId) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    const res = await ref
      .where("projectId", "==", projectId)
      .orderBy("start", "desc")
      .get();
    const data = await res.docs.map((doc) => doc.data());
    if (data.length !== 0) {
      dispatch(setTimers(data));
    } else {
      dispatch(timerError(projectId));
    }
  } catch (err) {
    console.error(err);
  }
};

//Create new timer
export const createNewTimer = (timer, closeMenu) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    await ref.doc(timer.id).set(timer);
    dispatch(addTimer(timer));
    closeMenu && closeMenu();
  } catch (err) {
    console.error(err);
  }
};

//Create new manual timer
export const createNewManualTimer = (timer, closeMenu) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    await ref.doc(timer.id).set(timer);
    dispatch(addTimer(timer));
    closeMenu && closeMenu();
  } catch (err) {
    console.error(err);
  }
};

//Delete timer by timer ID
export const deleteTimerById = (timerId) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    await ref.doc(timerId).delete();
    await dispatch(deleteTimer(timerId));
  } catch (err) {
    console.error(err);
  }
};

//Update timer
export const updateTimer = (updatedTimer) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    const updatedTimerSaveToUpdate = { ...updatedTimer };
    delete updatedTimerSaveToUpdate.id;
    await ref.doc(updatedTimer.id).update(updatedTimerSaveToUpdate);
    dispatch(updateTimerActionCreator(updatedTimer));
  } catch (err) {
    console.error(err);
  }
};

export const deleteTimersByProjectId = (projectId) => async (dispatch) => {
  try {
    const ref = firebase.firestore().collection("timers");
    await ref
      .where("projectId", "==", projectId)
      .get()
      .then((data) => {
        const batch = firebase.firestore().batch();

        data.forEach((doc) => batch.delete(doc.ref));
        return batch.commit();
      });
    await dispatch(deleteTimers(projectId));
  } catch (err) {
    console.error(err);
  }
};
