import axios from "axios";

export const register = async ({ name, email, password }) => {
  const response = await axios.post(
    'http://localhost:5001/api/v1/auth/register',
    { name, email, password }
  );

  return response;
}