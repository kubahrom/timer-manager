import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import validator from 'validator';
import LoginForm from './LoginForm/LoginForm';
import { motion } from 'framer-motion';

const Login = () => {
  //User inputs
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRemeberMe] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const dispatch = useDispatch();

  const pageLoadVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  const {
    errorMessage: { invalidLogin },
  } = useSelector(state => state.user);

  //Validate email
  const validateEmail = (emailInput = email) => {
    const isEmail = validator.isEmail(emailInput);
    if (!isEmail) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  //Validate email after change
  const validateEmailOnChange = e => {
    setEmail(e.target.value);
    if (errorEmail) {
      validateEmail(e.target.value);
    }
  };

  //Submit login
  const handleSubmit = e => {
    e.preventDefault();
    if (!errorEmail) {
      dispatch(loginUser({ email, password }));
      setPassword('');
    } else {
      setErrorEmail(true);
    }
  };

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

  return (
    <motion.div
      variants={pageLoadVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <LoginForm
        email={email}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRemeberMe={setRemeberMe}
        handleSubmit={handleSubmit}
        invalidLogin={invalidLogin}
        errorEmail={errorEmail}
        validateEmail={validateEmail}
        validateEmailOnChange={validateEmailOnChange}
      />
      <button onClick={handleLogin}>Login</button>
    </motion.div>
  );
};

export default Login;
