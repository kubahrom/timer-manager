import React from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';

const RegisterForm = () => {
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
  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default RegisterForm;
