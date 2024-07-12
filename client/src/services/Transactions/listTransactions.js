import axios from 'axios';

export const listTransactions = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:5001/api/v1/wallet/transactions',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
