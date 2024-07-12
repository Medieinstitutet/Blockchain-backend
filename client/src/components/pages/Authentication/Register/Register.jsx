import { useState } from 'react';
import { register } from '../../../../services/Authentication/register';
import { RegisterForm } from './RegisterForm';
import { Modal } from '../../../layout/Modal';
import { Logout } from '../Logout/Logout';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const registerUser = async () => {
    try {
      const response = await register({ name, email, password });
      localStorage.setItem('token', response.data.token);

      showModal(`Registration successful! Welcome, ${name}!`);
      console.log(response.data);
    } catch (err) {
      showModal('Registration failed. Please check your credentials.');
      console.error('Registration failed', err);
    }
  };

  const handleRegister = e => {
    e.preventDefault();
    if (!email || !password || !password) {
      showModal('Invalid credentials.');
    } else {
      registerUser();
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
      <RegisterForm
        name={name}
        email={email}
        password={password}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleRegister={handleRegister}
      />
      <Logout />

      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
