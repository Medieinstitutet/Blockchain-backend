import { useEffect, useState } from "react";
import { listTransactions } from "../../../services/Transactions/listTransactions";

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
    <ul>
      {transactions.map((transaction, index) => {
        return (
          <li key={transaction._id}>
            <h3>{`Transaction Index: ${index}`}</h3>
            <p>{`Transaction Data: ${JSON.stringify(transaction)}`}</p>
          </li>
        );
      })}
    </ul>
  );
}