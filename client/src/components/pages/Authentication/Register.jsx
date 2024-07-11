import { useState } from 'react';
import { register } from '../../../services/Authentication/register';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
      const response = await register({ name, email, password });
      console.log('Registration successful', response.data);
    } catch (err) {
      console.error('Registration failed', err);
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !password) {
      console.log('Invalid credentials');
    } else {
      registerUser();
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h3>Registration</h3>
        <input
          required
          type='text'
          placeholder='Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          required
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          required
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
      {name && <p>Registration successful! Welcome, {name}!</p>}
    </>
  );
};
