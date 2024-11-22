import axios from 'axios';

const API_URL = 'http://localhost:8084'; // Replace with your actual API endpoint

// Fetch Beneficiary by ID
export const postBeneficiaryDetails = async (id: string) => {
  try {
    const response = await axios.post(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching beneficiary details:', error);
    throw error;
  }
};

// Save or update personal details
export const saveBeneficiaryDetails = async (beneficiaryDetails) => {
   try {
    console.log("beneficiaryDetails..............",beneficiaryDetails)

    const response = await axios.post(`${API_URL}/api/beneficiaries`, beneficiaryDetails);
    return response.data;
  } catch (error) {
    console.error('Error saving beneficiary details:', error);
    throw error;
  }
};
