import React, { useState, useEffect } from 'react';
import { savePersonalDetails } from '../(tabs)/PersonalDetailsApi'; // Adjust the import path if needed
import { Alert } from 'react-native'; // Using Alert for pop-up feedback
import { postPersonalDetails } from '../(tabs)/PersonalDetailsApi';
// Define the shape of the personal details object
interface PersonalDetails {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    gender: string;
    dob: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
}

const PersonalDetailsScreen: React.FC = () => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        gender: '',
        dob: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        city: '',
        zipCode: ''
    });

    const [id, setId] = useState<string>('');  // Assume you have the user's ID stored somewhere
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions

    // Fetch personal details if an ID is available (e.g., user already exists)
    useEffect(() => {
        if (id) {
            fetchPersonalDetails(id);
        }
    }, [id]);

    const fetchPersonalDetails = async (userId: string) => {
        try {
            const data = await postPersonalDetails(userId);
            setPersonalDetails(data);
        } catch (error) {
            console.error('Error fetching personal details:', error);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  
        console.log("Form submit triggered",personalDetails,e); // Debugging log
        setIsLoading(true);  // Disable the button while the request is in progress

        try {
            const savedDetails = await savePersonalDetails(personalDetails);
            setIsLoading(false);
            console.log("Data saved:", savedDetails); // Debugging log
            Alert.alert('Success', 'Personal details saved successfully!', [{ text: 'OK' }]);
        } catch (error) {
            setIsLoading(false);
            console.error('Error saving personal details:', error);
            Alert.alert('Error', 'Failed to save personal details.', [{ text: 'OK' }]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalDetails({ ...personalDetails, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={personalDetails.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={personalDetails.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={personalDetails.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Mobile Number:</label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={personalDetails.mobileNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Gender:</label>
                <input
                    type="text"
                    name="gender"
                    value={personalDetails.gender}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="text"
                    name="dob"
                    value={personalDetails.dob}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address Line 1:</label>
                <textarea
                    name="addressLine1"
                    value={personalDetails.addressLine1}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address Line 2:</label>
                <textarea
                    name="addressLine2"
                    value={personalDetails.addressLine2}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Country:</label>
                <textarea
                    name="country"
                    value={personalDetails.country}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>State:</label>
                <textarea
                    name="state"
                    value={personalDetails.state}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>City:</label>
                <textarea
                    name="city"
                    value={personalDetails.city}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Zip Code:</label>
                <textarea
                    name="zipCode"
                    value={personalDetails.zipCode}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={isLoading}>Save</button>
        </form>
    );
};

export default PersonalDetailsScreen;
