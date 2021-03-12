import firebase from '../../firebase/firebase';

//Actions
export const SET_USER = 'set_user';
export const LOG_OUT = 'log_out';
export const USER_ERROR = 'user_error';
export const RESET_USER_ERROR = 'reset_user_error';
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
export const userError = payload => ({ type: USER_ERROR, payload });

//Reset user errors
export const resetUserError = () => ({ type: RESET_USER_ERROR });

//Set initial user after app load
export const setInitialUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //TODO______________________________________________________
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(userData => {
          if (userData.data() !== undefined) {
            dispatch(initSetUser({ ...userData.data(), email: user.email }));
          } else {
            dispatch(initSetNotUser());
          }
        });
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
    await dispatch(
      setUser({
        email: userInfo.email,
        uid: data.user.uid,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      })
    );
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        dispatch(userError({ invalidRegister: 'Email already in use.' }));
        break;
      case 'auth/weak-password':
        dispatch(userError({ invalidRegister: 'Your password is weak.' }));
        break;
      case 'auth/invalid-email':
        dispatch(userError({ invalidRegister: 'Invalid email.' }));
        break;
      default:
        break;
    }
  }
};

// Login user to database
export const loginUser = userInfo => async dispatch => {
  try {
    //const data =
    await firebase
      .auth()
      .signInWithEmailAndPassword(userInfo.email, userInfo.password);
    //This will call rerender which cause initSetUser action
    // await dispatch(setUser(data.user.uid));
  } catch (err) {
    switch (err.code) {
      case 'auth/user-not-found':
        dispatch(
          userError({ invalidLogin: 'User with this email not found.' })
        );
        break;
      case 'auth/invalid-email':
        dispatch(userError({ invalidLogin: 'Invalid email or password.' }));
        break;
      case 'auth/wrong-password':
        dispatch(userError({ invalidLogin: 'Invalid email or password.' }));
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
