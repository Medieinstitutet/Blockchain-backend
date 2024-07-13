import { useEffect, useState } from "react";
import { listTransactions } from "../../../services/Transactions/listTransactions";
import '../../../styles/listTxs.css'

export const ListTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await listTransactions();
        setTransactions(response.data.data);
      } catch (err) {
        console.error('Error fetching transactions', err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li key={transaction._id} className="transaction-item">
            <h3>{`Transaction Index: ${index}`}</h3>
            <h4>Transaction Data:</h4>
            <p><strong>Transaction ID:</strong> {transaction.id}</p>
            <p><strong>Sender:</strong> {transaction.inputMap?.address || 'N/A'}</p>
            <p><strong>Recipient(s):</strong> {Object.keys(transaction.outputMap).map((recipient, recipientIndex) => (
              <span key={recipientIndex}>
                {recipient}
                {recipientIndex < Object.keys(transaction.outputMap).length - 1 ? ', ' : ''}
              </span>
            ))}</p>
            <p><strong>Amount(s):</strong> {Object.values(transaction.outputMap).map((amount, amountIndex) => (
              <span key={amountIndex}>
                {amount}
                {amountIndex < Object.values(transaction.outputMap).length - 1 ? ', ' : ''}
              </span>
            ))}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
