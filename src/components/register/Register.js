import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';
import RegisterForm from './RegisterForm/RegisterForm';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [policyAgreement, setPolicyAgreement] = useState(false);
  const dispatch = useDispatch();

  const invalidLogin = '';

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
    console.log('Form submitted!');
  };
  return (
    <>
      <RegisterForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        policyAgreement={policyAgreement}
        setPolicyAgreement={setPolicyAgreement}
        handleSubmit={handleSubmit}
        invalidLogin={invalidLogin}
      />
      <button onClick={handleSignup}>Register</button>
    </>
  );
};

export default Register;
