import axios from "axios"

export const mineBlock = async () => {
  const response = await axios.get('http://localhost:5001/api/v1/wallet/minetransactions');
  
  return response;
}