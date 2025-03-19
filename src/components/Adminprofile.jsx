import React, { useEffect, useState } from 'react';

const AdminProfilePage = () => {
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    // Retrieve admin details from localStorage
    const adminData = localStorage.getItem('adminDetails');
    if (adminData) {
      setAdminDetails(JSON.parse(adminData)); // Parse and set the admin details
    }
  }, []);

  if (!adminDetails) {
    return <p>Loading admin details...</p>;
  }

  return (
    <div
      style={{
        marginTop:'160px',
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Profile</h2>
      <div style={{ marginBottom: '15px' }}>
        <strong>Name:</strong> <span>{adminDetails.name}</span>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong> <span>{adminDetails.email || 'Not provided'}</span>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Contact Number:</strong> <span>{adminDetails.number || 'Not provided'}</span>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Admin Key:</strong> <span>{adminDetails.adminKey}</span>
      </div>
    </div>
  );
};

export default AdminProfilePage;
