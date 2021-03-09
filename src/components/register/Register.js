import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { signupUser, userError } from '../../redux/actions/userActions';
import RegisterForm from './RegisterForm/RegisterForm';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [lastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [policyAgreement, setPolicyAgreement] = useState(false);
  const dispatch = useDispatch();

  const {
    errorMessage: { invalidRegister },
  } = useSelector(state => state.user);

  const user = {
    email: 'testemail@email.cz',
    password: 'Test123456',
    firstName: 'John',
    lastName: 'Doee',
  };
  const handleSignup = () => {
    dispatch(signupUser(user));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!policyAgreement) {
      dispatch(
        userError({
          invalidRegister: 'You must agree with terms of the registration.',
        })
      );
    }
    if (
      !errorFirstName &&
      !errorLastName &&
      !errorEmail &&
      !errorPassword &&
      policyAgreement
    ) {
      dispatch(
        signupUser({
          email,
          password,
          firstName,
          lastName,
        })
      );
    }
  };

  const validateFirstName = (firstNameInput = firstName) => {
    if (firstNameInput.length) {
      setErrorFirstName(false);
    } else {
      setErrorFirstName(true);
    }
  };

  const validateFirstNameOnChange = e => {
    setFirstName(e.target.value);
    if (errorFirstName) {
      validateFirstName(e.target.value);
    }
  };

  const validateLastName = (lastNameInput = lastName) => {
    if (lastNameInput.length) {
      setErrorLastName(false);
    } else {
      setErrorLastName(true);
    }
  };

  const validateLastNameOnChange = e => {
    setLastName(e.target.value);
    if (errorLastName) {
      validateLastName(e.target.value);
    }
  };

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

  const validatePassword = (passwordInput = password) => {
    const isPassword = validator.isStrongPassword(passwordInput, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });
    if (!isPassword) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  //Validate Password after change
  const validatePasswordOnChange = e => {
    setPassword(e.target.value);
    if (errorPassword) {
      validatePassword(e.target.value);
    }
  };

  return (
    <>
      <RegisterForm
        firstName={firstName}
        errorFirstName={errorFirstName}
        validateFirstName={validateFirstName}
        validateFirstNameOnChange={validateFirstNameOnChange}
        lastName={lastName}
        errorLastName={errorLastName}
        validateLastName={validateLastName}
        validateLastNameOnChange={validateLastNameOnChange}
        email={email}
        errorEmail={errorEmail}
        validateEmail={validateEmail}
        validateEmailOnChange={validateEmailOnChange}
        password={password}
        errorPassword={errorPassword}
        validatePassword={validatePassword}
        validatePasswordOnChange={validatePasswordOnChange}
        policyAgreement={policyAgreement}
        setPolicyAgreement={setPolicyAgreement}
        handleSubmit={handleSubmit}
        invalidRegister={invalidRegister}
      />
      <button onClick={handleSignup}>Register</button>
    </>
  );
};

export default Register;
