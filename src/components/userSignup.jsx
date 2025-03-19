import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://lms-management-5dca8-default-rtdb.firebaseio.com/User.json';

const generateUserId = () => {
  return Math.floor(Math.random() * 1000000000); // Generates a random 9-digit number
};

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    username: '',
    userId: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const { name, phone, email, password, username } = formData;

    if (!name || !phone || !email || !password || !username) {
      setMessage('Please fill out all mandatory fields.');
      return;
    }

    if (!validatePhoneNumber(phone)) {
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

    try {
      const newUserId = generateUserId();

      const userData = {
        name,
        address: formData.address,
        phone,
        email,
        password,
        username,
        userId: newUserId,
      };

      await axios.post(API_URL, userData);

      setMessage('Signup successful! Please log in.');
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        username: '',
        userId: '',
      });

      navigate('/userlogin');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name (Mandatory)"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address (Optional)"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number (10 digits, Mandatory)"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email (Valid format, Mandatory)"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username (Mandatory)"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (8+ chars, 1 uppercase, 1 number, 1 symbol)"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      <p className="message">{message}</p>
      <p className="redirect">
        Already have an account? <Link to="/userlogin">Login here</Link>
      </p>
    </div>
  );
};

export default UserSignup;
