import { useEffect, useState } from 'react';

export const Modal = ({ message = '', onClose, isOpenInitially = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  useEffect(() => {
    if (message) setIsOpen(true); // Show the modal if there's a message
  }, [message]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); // Call the onClose callback if provided
  };

  // Handle click outside of modal content
  const handleClickOutside = event => {
    if (event.target.className === 'modal') {
      handleClose();
    }
  };

  // Prevent modal close when clicking inside the modal content
  const stopPropagation = e => e.stopPropagation();

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      className='modal'
      onClick={handleClickOutside}>
      <div className='modal-content' onClick={stopPropagation}>
        <span
          className='close'
          onClick={handleClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};
