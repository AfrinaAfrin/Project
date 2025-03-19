import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const API_URL = 'https://lms-management-5dca8-default-rtdb.firebaseio.com/User.json';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const generateTemporaryPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let tempPassword = '';
    for (let i = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return tempPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.get(API_URL);
      const users = response.data;

      // Find the user with the provided email
      const userKey = Object.keys(users || {}).find(
        (key) => users[key].email === email
      );

      if (userKey) {
        // Generate a temporary password
        const tempPassword = generateTemporaryPassword();

        // Update the user's password in the database
        await axios.patch(`${API_URL.replace('.json', '')}/${userKey}.json`, {
          password: tempPassword,
        });

        // Simulate sending an email (replace with actual email service in production)
        alert(`Temporary password sent to: ${email}\nTemporary Password: ${tempPassword}`);

        setMessage('Temporary password has been sent to your email.');
      } else {
        setMessage('Email not found. Please check and try again.');
      }
    } catch (error) {
      console.error('Error processing forgot password request:', error);
      setMessage('Error processing your request. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Send Temporary Password</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default ForgotPassword;
