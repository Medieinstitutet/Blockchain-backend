import { useState } from 'react';
import { login } from '../../../../services/Authentication/login';
import { LoginForm } from './LoginForm';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogedIn, setIsLogedIn] = useState(false);

  const loginUser = async () => {
    try {
      const response = await login({ email, password });
      setIsLogedIn(true);
      console.log('Login successful', response.data);
    } catch (err) {
      alert('Login failed', err);
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    if (!email || !password) {
      console.log('Invalid credentials');
    } else {
      loginUser();
    }
  };

  return (
    <>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isLogedIn={isLogedIn}
        handleLogin={handleLogin}
      />
    </>
  );
};
