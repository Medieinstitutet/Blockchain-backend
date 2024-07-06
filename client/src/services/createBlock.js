import axios from "axios"

export const createBlock = async () => {
  const response = await axios.post('http://localhost:5001/api/v1/block/mine');
  
  return response;
}