import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import validator from 'validator';
import LoginForm from './LoginForm/LoginForm';

const Login = () => {
  //User inputs
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRemeberMe] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    loggedIn,
    errorMessage: { invalidLogin },
  } = useSelector(state => state.user);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  //Testlogin
  const handleLogin = () => {
    dispatch(
      loginUser({
        email: 'testemail@email.cz',
        password: 'Test123456',
        firstName: 'John',
        lastName: 'Doee',
      })
    );
  };

  //Submit login
  const handleSubmit = e => {
    e.preventDefault();
    const isEmail = validator.isEmail(email);
    if (isEmail) {
      dispatch(loginUser({ email, password }));
    } else {
      console.log('error');
    }
  };

  return (
    <>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRemeberMe={setRemeberMe}
        handleSubmit={handleSubmit}
        invalidLogin={invalidLogin}
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default Login;
