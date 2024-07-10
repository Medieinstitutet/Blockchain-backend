import axios from "axios";

export const getWallet = async () => {
  const response = await axios.get('http://localhost:5001/api/v1/wallet/getwallet');

  return response;
}