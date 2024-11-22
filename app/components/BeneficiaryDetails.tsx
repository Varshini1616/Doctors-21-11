import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'; // Using Alert for pop-up feedback
import { saveBeneficiaryDetails } from '../(tabs)/AddBeneficiaryApi';
import { postBeneficiaryDetails } from '../(tabs)/AddBeneficiaryApi';
// Define the shape of the beneficiary details object
interface BeneficiaryDetails {
    beneficiaryName: string;
    beneficiaryMobile: string;
    medicalHistory: string;
    
}

const BeneficiaryDetailsScreen: React.FC = () => {
    const [beneficiaryDetails, setBeneficiaryDetails] = useState<BeneficiaryDetails>({
        beneficiaryName: '',
        beneficiaryMobile: '',
        medicalHistory: '',
        
    });

    const [id, setId] = useState<string>('');  // Assume you have the user's ID stored somewhere
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions

    // Fetch beneficiary details if an ID is available (e.g., beneficiary already exists)
    useEffect(() => {
        if (id) {
            fetchBeneficiaryDetails(id);
        }
    }, [id]);

    const fetchBeneficiaryDetails = async (userId: string) => {
        try {
            const data = await postBeneficiaryDetails(userId);
            setBeneficiaryDetails(data);
        } catch (error) {
            console.error('Error fetching beneficiary details:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submit triggered", beneficiaryDetails, e); // Debugging log
        setIsLoading(true);  // Disable the button while the request is in progress

        try {
            const savedDetails = await saveBeneficiaryDetails(beneficiaryDetails);
            setIsLoading(false);
            console.log("Data saved:", savedDetails); // Debugging log
            Alert.alert('Success', 'Beneficiary details saved successfully!', [{ text: 'OK' }]);
        } catch (error) {
            setIsLoading(false);
            console.error('Error saving beneficiary details:', error);
            Alert.alert('Error', 'Failed to save beneficiary details.', [{ text: 'OK' }]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBeneficiaryDetails({ ...beneficiaryDetails, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Beneficiary Name:</label>
                <input
                    type="text"
                    name="beneficiaryName"
                    value={beneficiaryDetails.beneficiaryName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Beneficiary Mobile:</label>
                <input
                    type="tel"
                    name="beneficiaryMobile"
                    value={beneficiaryDetails.beneficiaryMobile}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Medical History:</label>
                <textarea
                    name="medicalHistory"
                    value={beneficiaryDetails.medicalHistory}
                    onChange={handleChange}
                />
            </div>
            
            <button type="submit" disabled={isLoading}>Save</button>
        </form>
    );
};

export default BeneficiaryDetailsScreen;
