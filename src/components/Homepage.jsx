import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Homepage() {
  const bookss = [
    { id: 1, title: 'One piece', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqwlggR-uHZx1blfKAxIPaEx7FTtgE1lBKQ&s' },
    { id: 2, title: 'Naruto', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb4bVkR3BMI26CwopPkfrvL8ZTFaFCkiGS-w&s' },
    { id: 3, title: 'Major', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7hwh_VM-BJOd0NIASYYqxh66AcAZR1fGJpQ&s' },
    { id: 4, title: 'Anna Dressed in Blood', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYggvvvKeiC1gjx7RUtQ2Y8XOTO7OeEXRKeQ&s' },
    { id: 5, title: 'Deadpool', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPb-1EtSpfKOmqoVe2-ew2N8FwTsRI7N5vQ&s' },
    { id: 6, title: 'Abracadabra', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEEqJvpFsDYWu0pZWZaRxla16vejSyZUg_jg&ss' },
    { id: 7, title: 'VIP Orgins', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLEQ7URVDRTZrcsWW2bV8njHJjON3W_F42w&s' },
    { id: 8, title: 'YoungLOve', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi729OZGznyukwSAhn5HkWjHwK4s3RKfiYsg&s' },
    { id: 9, title: 'Spiderman NO Way Home', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH52UPceITGBYf0mNCcELy65eBPW-xaewVHA&s' },
    { id: 10, title: 'Horror', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKciBmGhGWCzR_b8O6j-LJZE9AqhVUxYoe_g&s' },
  ];

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Check if user is logged in

  useEffect(() => {
    // Fetch books data from Firebase
    axios
      .get('https://lms-management-5dca8-default-rtdb.firebaseio.com/Books.json')
      .then((response) => {
        const bookData = Object.entries(response.data || {});

        // Reverse the array to display the newest book first
        const sortedBooks = bookData.reverse();
        setBooks(sortedBooks);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredBooks = books.filter(([key, book]) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExploreClick = () => {
    if (!userId) {
      // Redirect to login page if user is not logged in
      alert('Please log in first!');
      navigate('/userlogin');
    } else {
      // If user is logged in, continue with exploration
      navigate('/');
    }
  };

  const handleBookClick = (bookId) => {
    if (!userId) {
      alert('Please log in first to view the book details!');
      navigate('/userlogin');
    } else {
      navigate(`/book/${bookId}`, { state: { bookId } });
    }
  };

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <h2>
            Welcome to the <span>Library</span>
          </h2>
          <p>Your gateway to endless knowledge and adventures.</p>
          <button className="btn-primary" onClick={handleExploreClick}>
            Explore Now
          </button>
        </div>
        <div className="flex">
          {bookss.map((book) => (
            <div className="card" key={book.id} onClick={() => handleBookClick(book.id)}>
              <img src={book.src} alt={`Cover of ${book.title}`} />
              <p className="book-title">{book.title}</p>
            </div>
          ))}
        </div>
        <div className="hero-image">
          <img src="https://i.pinimg.com/736x/59/d0/02/59d002b55ce676a1db1f77896e39ab42.jpg" alt="Library Illustration" />
          <p className="booktitle">Black Clover</p>
        </div>
      </section>

      {/* Search Bar Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title or Author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Book Catalog */}
      <section className="catalog">
        <h2>Latest Our Collection</h2>
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(([key, book]) => (
              <div key={key} className="book-card" onClick={() => handleBookClick(key)}>
                <img
                  src={book.imageLink.startsWith('http') ? book.imageLink : `/${book.imageLink}`}
                  alt={book.title}
                />
                <div>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No books found matching your search criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
