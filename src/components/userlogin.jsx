import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Add Link for navigation
import './Auth.css';

const API_URL = 'https://lms-management-5dca8-default-rtdb.firebaseio.com/User.json';

const UserLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.get(API_URL);
      const users = response.data;

      const user = Object.values(users || {}).find(
        (user) => user.username === formData.username && user.password === formData.password
      );

      if (user) {
        setMessage('Login successful!');
        setUser(user);

        localStorage.setItem('userId', user.userId);
        localStorage.setItem('userDetails', JSON.stringify(user));

        navigate(`/${user.userId}/home`);
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      <p className="redirect">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default UserLogin;
