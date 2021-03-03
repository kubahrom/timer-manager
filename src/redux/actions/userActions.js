import firebase from '../../firebase/firebase';

//Actions
export const SET_USER = 'set_user';
export const LOG_OUT = 'log_out';
export const USER_ERROR = 'user_error';
export const INIT_SET_USER = 'init_set_user';
export const INIT_SET_NOT_USER = 'init_set_not_user';

//Set user action creator
const setUser = payload => ({ type: SET_USER, payload });

//Initial user load
const initSetUser = payload => ({ type: INIT_SET_USER, payload });
//Initial
const initSetNotUser = () => ({ type: INIT_SET_NOT_USER });

//Logout user action creator
const logoutUser = () => ({
  type: LOG_OUT,
});

//Error action creator
const userError = payload => ({ type: USER_ERROR, payload });

//Set initial user after app load
export const setInitialUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(initSetUser(user.uid));
    } else {
      dispatch(initSetNotUser());
    }
  });
};

//Sign up user with emain and password to firebase
export const signupUser = userInfo => async dispatch => {
  try {
    const ref = firebase.firestore().collection('users');
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    await ref.doc(data.user.uid).set({
      uid: data.user.uid,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });
    await dispatch(setUser(data.user.uid));
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        dispatch(userError({ usedEmail: err.message }));
        break;
      case 'auth/weak-password':
        dispatch(userError({ weakPassword: err.message }));
        break;
      case 'auth/invalid-email':
        dispatch(userError({ invalidEmail: err.message }));
        break;
      default:
        break;
    }
  }
};

// Login user to database
export const loginUser = userInfo => async dispatch => {
  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password);
    await dispatch(setUser(data.user.uid));
  } catch (err) {
    switch (err.code) {
      case 'auth/user-not-found':
        dispatch(userError({ notFound: err.message }));
        break;
      case 'auth/invalid-email':
        dispatch(userError({ invalidEmail: err.message }));
        break;
      case 'auth/wrong-password':
        dispatch(userError({ wrongPassword: err.message }));
        break;
      default:
        break;
    }
  }
};

//Logout user from firebase
export const logoutUserFromApp = () => async dispatch => {
  try {
    await firebase.auth().signOut();
    await dispatch(logoutUser());
  } catch (err) {
    console.error(err);
  }
};
