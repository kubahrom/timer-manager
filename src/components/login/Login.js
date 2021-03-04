import React from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = {
    email: 'testemail@email.cz',
    password: 'Test123456',
    firstName: 'John',
    lastName: 'Doee',
  };

  const handleLogin = () => {
    dispatch(loginUser(user));
  };
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
