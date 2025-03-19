import React, { useState } from 'react';
import './BookCatalog.css';

// Simple SVG icons as components
const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const BookIcon = () => (
  <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20" />
  </svg>
);

const BookCatalog = () => {
  // Sample data - in real app this would come from your backend
  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      available: true,
      coverUrl: "/api/placeholder/200/300",
      publishedDate: "1925"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      genre: "Science Fiction",
      available: false,
      coverUrl: "/api/placeholder/200/300",
      publishedDate: "1949"
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      available: true,
      coverUrl: "/api/placeholder/200/300",
      publishedDate: "1813"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", "Classic", "Science Fiction", "Romance", "Mystery"];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="catalog-container">
      {/* Header Section */}
      <div className="catalog-header">
        <h1>Book Catalog</h1>
        <p>Discover our collection of books</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="genre-filters">
          {genres.map(genre => (
            <button
              key={genre}
              className={`filter-button ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="book-grid">
        {filteredBooks.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-cover-container">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="book-cover"
              />
              <span className={`availability-badge ${book.available ? 'available' : 'borrowed'}`}>
                {book.available ? 'Available' : 'Borrowed'}
              </span>
            </div>
            <div className="book-info">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <div className="book-metadata">
                <span className="book-genre">{book.genre}</span>
                <span className="book-year">{book.publishedDate}</span>
              </div>
            </div>
            <button 
              className={`borrow-button ${!book.available ? 'disabled' : ''}`}
              disabled={!book.available}
            >
              {book.available ? 'Borrow Book' : 'Join Waitlist'}
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="empty-state">
          <BookIcon />
          <h3>No books found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default BookCatalog;