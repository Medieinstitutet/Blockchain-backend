import axios from "axios";

export const login = async ({ email, password }) => {
  const response = await axios.post(
    'http://localhost:5001/api/v1/auth/login',
    { email, password }
  );

  return response;
}