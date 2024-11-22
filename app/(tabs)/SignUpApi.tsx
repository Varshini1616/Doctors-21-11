import axios from 'axios';
const API_URL = 'http://localhost:8083'; // Replace with your actual API endpoint

export const postSignUp = async (id: string) => {
  try {
    const response = await axios.post(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching signUp :', error);
    throw error;
  }
};

// Save or update Signup details
export const saveSignUp = async (signup) => {
   try {
    console.log("signup..............",signup)

    const response = await axios.post(`${API_URL}/api/signup`, signup);
    return response.data;
  } catch (error) {
    console.error('Error saving signup  :', error);
    throw error;
  }
};
