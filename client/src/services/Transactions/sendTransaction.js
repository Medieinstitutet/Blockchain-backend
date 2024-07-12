import axios from "axios";

export const sendTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:5001/api/v1/wallet/sendtransaction',
    transactionData,
    { headers: {Authorization: `Bearer ${token}`} }
  );

  return response;
}