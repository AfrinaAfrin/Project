import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        password: '',
        address: '', // Address field
        adminKey: '' // Field to store generated key
    });
    const [message, setMessage] = useState('');

    const generateAdminKey = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 8)}`; // Unique key using timestamp and random string
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Validation functions
    const validatePhoneNumber = (number) => /^\d{10}$/.test(number);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');

        const { name, number, email, password } = formData;

        // Validation checks
        if (!name || !number || !email || !password) {
            setMessage('Please fill out all mandatory fields.');
            return;
        }

        if (!validatePhoneNumber(number)) {
            setMessage('Phone number must be exactly 10 digits.');
            return;
        }

        if (!validateEmail(email)) {
            setMessage('Invalid email format.');
            return;
        }

        if (!validatePassword(password)) {
            setMessage(
                'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
            );
            return;
        }

        const adminKey = generateAdminKey(); // Generate admin key
        const adminData = { ...formData, adminKey };

        try {
            await axios.post('https://lms-management-5dca8-default-rtdb.firebaseio.com/Admin.json', adminData);
            alert(`Signup successful! Your admin key is: ${adminKey}`);
            setFormData({
                name: '',
                number: '',
                email: '',
                password: '',
                address: '', // Reset fields
                adminKey: ''
            });
        } catch (error) {
            console.error('Error signing up:', error);
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>Admin Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name (Mandatory)"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="number"
                    placeholder="Phone Number (10 digits, Mandatory)"
                    value={formData.number}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (Valid format, Mandatory)"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password (8+ chars, 1 uppercase, 1 number, 1 symbol)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address (Optional)"
                    value={formData.address}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            <p className="message">{message}</p>
            <p className="redirect">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;
