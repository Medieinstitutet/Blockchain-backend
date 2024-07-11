import axios from 'axios';

export const getWallet = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:5001/api/v1/wallet/getwallet',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
