import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  logoutUserFromApp,
  setInitialUser,
  signupUser,
} from './redux/actions/userActions';

function App() {
  const { userId } = useSelector(state => state.user);
  console.log(userId);
  const dispatch = useDispatch();
  const user = {
    email: 'testemail@email.cz',
    password: 'Test123456',
    firstName: 'John',
    lastName: 'Doee',
  };

  const handleSignup = () => {
    dispatch(signupUser(user));
  };

  const handleLogin = () => {
    dispatch(loginUser(user));
  };

  const handleLogout = () => {
    dispatch(logoutUserFromApp());
  };

  useEffect(() => {
    dispatch(setInitialUser());
  }, [dispatch]);

  return (
    <div>
      <h1>test</h1>
      <p>{}</p>
      <button onClick={handleSignup}>Click to signup</button>
      <button onClick={handleLogout}>Logout user</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;
