import axios from 'axios';

export const listBlocks = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    'http://localhost:5001/api/v1/blockchain/',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response;
};
