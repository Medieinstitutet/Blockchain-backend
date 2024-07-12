import { useState } from 'react';
import { Modal } from '../../../layout/Modal';

export const Logout = () => {
  const [modalMessage, setModalMessage] = useState('');

  const logoutUser = async () => {
    try {
      localStorage.removeItem('token');

      showModal(`Logout successful!`);
    } catch (err) {
      showModal('Logout failed.');
      console.log('Logout failed', err);
    }
  };

  const handleLogout = e => {
    e.preventDefault();
    logoutUser();
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
      <button onClick={handleLogout}>Logout</button>

      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
