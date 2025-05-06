import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );
  return response.data;
};


export const addUser = async (user: { name: string; email: string }) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
  return response.data;
};