import { useState } from 'react';
import { sendTransaction } from '../../../services/Wallet/sendTransaction';
import { getWallet } from '../../../services/Wallet/getWallet';
import { Wallet } from '../Wallet/Wallet';
import { Modal } from '../../layout/Modal';
import '../../../styles/modal.css';
import { Transaction } from './Transaction';

export const SendTransaction = () => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const createTransaction = async () => {
    try {
      // Send transaction request to the server
      await sendTransaction({ recipient, amount });

      // Fetch the wallet details after the transaction
      const walletResponse = await getWallet();
      const { address, balance } = walletResponse.data.data;

      showModal(
        <div>
          <h3>Transaction Details</h3>
          <p>Amount: {amount}</p>
          <p>Recipient: {recipient}</p>
          <p>Sender: {address}</p>
          <p>Balance: {balance}</p>
        </div>
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTransaction = e => {
    e.preventDefault();
    createTransaction();
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
      <Wallet />
        <Transaction
          amount={amount}
          recipient={recipient}
          setAmount={setAmount}
          setRecipient={setRecipient}
          handleSendTransaction={handleSendTransaction}
        />

      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
