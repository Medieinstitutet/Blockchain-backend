import { useState } from 'react';
import { register } from '../../../../services/Authentication/register';
import { RegisterForm } from './RegisterForm';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const registerUser = async () => {
    try {
      const response = await register({ name, email, password });
      setIsRegistered(true);
      console.log('Registration successful', response.data);
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (!email || !password || !password) {
      console.log('Invalid credentials');
    } else {
      registerUser();
    }
  };

  return (
    <>
      <RegisterForm
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        isRegistered={isRegistered}
        handleRegister={handleRegister}
      />
    </>
  );
};
