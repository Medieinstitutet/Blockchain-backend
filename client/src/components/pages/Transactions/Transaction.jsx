export const Transaction = ({
  amount,
  recipient,
  setAmount,
  setRecipient,
  handleSendTransaction
}) => {
  return (
    <>
      <form onSubmit={handleSendTransaction}>
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
    </>
  );
};
