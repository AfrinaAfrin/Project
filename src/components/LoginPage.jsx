import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    adminKey: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://lms-management-5dca8-default-rtdb.firebaseio.com/Admin.json');
      const admins = response.data;

      // Check if the user exists with the correct adminKey
      const foundAdmin = Object.entries(admins).find(
        ([id, admin]) =>
          admin.name === formData.username && admin.adminKey === formData.adminKey
      );

      if (foundAdmin) {
        const [adminId, adminData] = foundAdmin; // Get the admin ID and data

        // Save the adminId, adminDetails, and adminKey to localStorage
        localStorage.setItem('adminId', adminId); // Store adminId
        localStorage.setItem('adminDetails', JSON.stringify(adminData)); // Store adminData as a JSON string
        localStorage.setItem('adminKey', adminData.adminKey); // Store the adminKey

        alert('Login successful!');

        navigate('/admin'); // Redirect to the admin dashboard
      } else {
        alert('Invalid username or admin key.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '400px',
        height: '300px',
        marginBottom: '100px',
        marginLeft: '550px',
        borderRadius: '10px',
        marginTop: '150px',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '20px' }}>Admin Login</h2>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            margin: '10px 0',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <input
          type="text"
          name="adminKey"
          placeholder="Admin Key"
          value={formData.adminKey}
          onChange={handleChange}
          required
          style={{
            padding: '10px',
            margin: '10px 0',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginTop: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
