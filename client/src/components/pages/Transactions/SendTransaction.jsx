import { useState } from 'react';
import { sendTransaction } from '../../../services/sendTransaction';
import { getWallet } from '../../../services/getWallet';
import { Wallet } from '../Wallet/Wallet';
import { Modal } from '../../layout/Modal';
import '../../../styles/modal.css';

export const SendTransaction = () => {
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const createTransaction = async () => {
    try {
      // Send transaction request to the server
      const response = await sendTransaction({ recipient, amount });
      const { id } = response.data;

      // Fetch the wallet details after the transaction
      const walletResponse = await getWallet();
      const { address, balance } = walletResponse.data.data;

      const transactionDetails = {
        id,
        amount,
        recipient,
        sender: address,
        balance,
      };

      setTransaction(transactionDetails);
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

  const handleCreateTransaction = e => {
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
      <form onSubmit={handleCreateTransaction}>
        <Wallet />
        <label>Amount:</label>
        <input
          required
          type='number'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <label>Recipient:</label>
        <input
          required
          type='text'
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        />

        <button type='submit'>Send Transaction</button>
      </form>
      <Modal
        message={modalMessage}
        onClose={() => handleModalClose}
      />
    </>
  );
};
