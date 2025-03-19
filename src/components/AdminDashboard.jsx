import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    author: '',
    country: '',
    imageLink: '',
    language: '',
    link: '',
    pages: '',
    title: '',
    year: '',
    publish_date: '',
    description: '',
    genre: '',
    availableStock: '',
  });

  useEffect(() => {
    axios
      .get('https://lms-management-5dca8-default-rtdb.firebaseio.com/details.json')
      .then((response) => {
        const rawData = response.data || {};
        const formattedBooks = [];

        Object.entries(rawData).forEach(([detailId, detailData]) => {
          const books = Array.isArray(detailData.bookd)
            ? detailData.bookd
            : Object.values(detailData.bookd || {});
          books.forEach((book) => {
            if (detailData.userId && detailData.bookId !== "undefined") {
              formattedBooks.push({
                id: detailId,
                bookId: detailData.bookId,
                author: book.author,
                title: book.title,
                borrowDate: detailData.borrowDate,
                userId: detailData.userId,
              });
            }
          });
        });

        setBorrowedBooks(formattedBooks);
      })
      .catch((error) => console.error('Error fetching borrowed books:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://lms-management-5dca8-default-rtdb.firebaseio.com/Books.json', newBook);
      alert('Book added successfully!');
      setNewBook({
        author: '',
        country: '',
        imageLink: '',
        language: '',
        link: '',
        pages: '',
        title: '',
        year: '',
        publish_date: '',
        description: '',
        genre: '',
        availableStock: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add the book.');
    }
  };

  return (
    <div className="admin-dashboard">
    <h1>Admin Dashboard</h1>
    <div className="section">
      {/* Add Book Form */}
      <div className="add-book-form">
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Author:
            <input type="text" name="author" value={newBook.author} onChange={handleChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={newBook.country} onChange={handleChange} required />
          </label>
          <label>
            Image Link:
            <input type="text" name="imageLink" value={newBook.imageLink} onChange={handleChange} required />
          </label>
          <label>
            Language:
            <input type="text" name="language" value={newBook.language} onChange={handleChange} required />
          </label>
          <label>
            Link:
            <input type="url" name="link" value={newBook.link} onChange={handleChange} required />
          </label>
          <label>
            Pages:
            <input type="number" name="pages" value={newBook.pages} onChange={handleChange} required />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={newBook.title} onChange={handleChange} required />
          </label>
          <label>
            Year:
            <input type="number" name="year" value={newBook.year} onChange={handleChange} required />
          </label>
          <label>
            Publish Date:
            <input type="date" name="publish_date" value={newBook.publish_date} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={newBook.description} onChange={handleChange} required />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={newBook.genre} onChange={handleChange} required />
          </label>
          <label>
            Available Stock:
            <input type="number" name="availableStock" value={newBook.availableStock} onChange={handleChange} required />
          </label>
          <button type="submit">Add Book</button>
        </form>
      </div>
  
      {/* Borrowed Books Table */}
      <div className="borrowed-books">
        <h2>Borrowed Book Details</h2>
        <table className="user-book-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks && borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.userId}</td>
                  <td>{Number(book.bookId) + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )  
};

export default AdminDashboard;
