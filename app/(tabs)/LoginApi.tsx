import axios from 'axios';
const API_URL = 'http://localhost:8080'; // Replace with your actual API endpoint

export const postLogin = async (id: string) => {
  try {
    const response = await axios.post(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Login :', error);
    throw error;
  }
};

// Save or update Login details
export const saveLogin = async (login) => {
   try {
    console.log("login..............",login)

    const response = await axios.post(`${API_URL}/api/auth`, login);
    return response.data;
  } catch (error) {
    console.error('Error saving login  :', error);
    throw error;
  }
};
