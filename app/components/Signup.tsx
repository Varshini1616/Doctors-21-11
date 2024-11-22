import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native'; // Using Alert for pop-up feedback
import { saveSignUp } from '../(tabs)/SignUpApi';
import { postSignUp} from '../(tabs)/SignUpApi';
// Define the shape of the sign-up details object
 interface SignUp {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string;
    confirmPassword: string;
}

const SignUpScreen: React.FC = () => {
    const [signUp, setSignUp] = useState<SignUp>({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state to prevent multiple submissions

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submit triggered", signUp, e); // Debugging log
        setIsLoading(true);  // Disable the button while the request is in progress

        if (signUp.password !== signUp.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }]);
            setIsLoading(false);
            return;
        }

        try {
            // Perform the sign-up request (replace with actual sign-up API call)
            console.log('Sign-up details submitted:', signUp);
            setIsLoading(false);
            Alert.alert('Success', 'Registration successful!', [{ text: 'OK' }]);
        } catch (error) {
            setIsLoading(false);
            console.error('Error during sign-up:', error);
            Alert.alert('Error', 'Failed to complete registration.', [{ text: 'OK' }]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUp, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={signUp.firstName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={signUp.lastName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={signUp.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Mobile Number:</label>
                <input
                    type="tel"
                    name="mobileNumber"
                    value={signUp.mobileNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={signUp.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={signUp.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" disabled={isLoading}>Sign Up</button>
        </form>
    );
};

export default SignUpScreen;
