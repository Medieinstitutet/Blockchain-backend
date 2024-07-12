import { useState } from 'react';
import { login } from '../../../../services/Authentication/login';
import { LoginForm } from './LoginForm';
import { Modal } from '../../../layout/Modal';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const loginUser = async () => {
    try {
      const response = await login({ email, password });
      showModal(`Log in successful! Welcome back, ${email}`);
      console.log(response.data);
    } catch (err) {
      showModal('Login failed. Please check your credentials.');
      console.log('Login failed', err);
    }
  };

  const handleLogin = e => {
    e.preventDefault();
    if (!email || !password) {
      showModal('Invalid credentials');
    } else {
      loginUser();
    }
  };

  // Function to show modal with a specific message
  const showModal = message => {
    setModalMessage(message);
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setModalMessage(''); // Clear the message, effectively hiding the modal
  };

  return (
    <>
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />

      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
