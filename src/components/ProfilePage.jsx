import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem('userDetails');
    const userId = localStorage.getItem('userId');
    
    if (!storedUser || !userId) {
      navigate('/'); // Redirect to login if userId or userDetails is not found
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Set user data from localStorage

      // Fetch borrowed book details using userId from the details API
      axios
        .get(`https://lms-management-5dca8-default-rtdb.firebaseio.com/details`)
        .then((response) => {
          const rawData = response.data || {};
          const userBooks = [];

          // Loop through the data and filter books by userId
          Object.entries(rawData).forEach(([detailId, detailData]) => {
            const books = Array.isArray(detailData.bookd)
              ? detailData.bookd
              : Object.values(detailData.bookd || {});
            books.forEach((book) => {
              if (detailData.userId === userId) {
                userBooks.push({
                  title: book.title,
                  author: book.author,
                  borrowDate: detailData.borrowDate,
                });
              }
            });
          });

          setBorrowedBooks(userBooks); // Update the borrowed books state
          co
        })
        .catch((error) => console.error('Error fetching borrowed book details:', error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Clear userId from localStorage
    localStorage.removeItem('userDetails'); // Clear userDetails from localStorage
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <div className="profile-header">
            <img
              className="profile-picture"
              src={user.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.address}</p>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="profile-details">
            <h3>Borrowed Books</h3>
            {borrowedBooks.length > 0 ? (
              <div className="borrowed-books-list">
                {borrowedBooks.map((book, index) => (
                  <div key={index} className="bookcard">
                    <strong>{book.title}</strong>
                    <p>by {book.author}</p>
                    <p>Borrowed on: {new Date(book.borrowDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No borrowed books found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="loading-screen">Loading...</div>
      )}
    </div>
  );
};

export default ProfilePage;
