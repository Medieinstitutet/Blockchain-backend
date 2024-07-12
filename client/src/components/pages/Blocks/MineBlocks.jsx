import { useState } from 'react';
import { mineBlock } from '../../../services/Blocks/mineBlock';
import { Modal } from '../../layout/Modal';

export const MineBlocks = () => {
  const [modalMessage, setModalMessage] = useState('');

  const block = async () => {
    try {
      const response = await mineBlock();
      localStorage.setItem('token', response.data.token);
      
      showModal(`Block successfully mined!`);
      console.log(response.data);
    } catch (err) {
      showModal('Error: block mining failed.');
      console.error('Block mining', err);
    }
  };

  const handleMineBlock = async () => block();

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
      <div>
        <button onClick={handleMineBlock}>Mine Block</button>
      </div>

      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
