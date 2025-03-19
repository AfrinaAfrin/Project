import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function BookDetails() {
  const { state } = useLocation();
  const { bookId } = state || {};
  const [bookDetails, setBookDetails] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [isBorrowed, setIsBorrowed] = useState(false); 
  const [availableStock, setAvailableStock] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); 
  console.log(userId);

  useEffect(() => {
    if (!userId) {
      navigate('/userlogin'); 
    } else if (bookId) {
      axios
        .get(`https://lms-management-5dca8-default-rtdb.firebaseio.com/Books/${bookId}.json`)
        .then((response) => {
          const bookData = response.data;
          setBookDetails(bookData);
          setAvailableStock(bookData.availableStock); 
          setIsBorrowed(bookData.isBorrowed || false);
        })
        .catch((error) => {
          console.error('Error fetching book details: ', error);
        });
    }
  }, [bookId, userId, navigate]);

  useEffect(() => {
    if (bookDetails) {
      axios
        .get('https://libarayms-default-rtdb.firebaseio.com/books.json')
        .then((response) => {
          const allBooks = Object.entries(response.data || {});
          const filteredBooks = allBooks.filter(
            ([key, book]) => book.language === bookDetails.language && key !== bookId
          );
          setRelatedBooks(filteredBooks);
        })
        .catch((error) => {
          console.error('Error fetching related books: ', error);
        });
    }
  }, [bookDetails, bookId]);

  const handleBorrow = () => {
    if (availableStock > 0) {
      const updatedStock = availableStock - 1;

      axios
        .patch(`https://libarayms-default-rtdb.firebaseio.com/books/${bookId}.json`, {
          availableStock: updatedStock,
          isBorrowed: true,
        })
        .then(() => {
          setAvailableStock(updatedStock);
          setIsBorrowed(true);

          // Create borrowing details including book title and author
          const borrowDetails = {
            userId: userId,
            bookId: bookId,
            borrowDate: new Date().toISOString(), // Store the current date and time
            bookd: [{
              title: bookDetails.title,
              author: bookDetails.author,
            }],
          };

          // Store the borrowing details in Firebase
          axios
            .post('https://libarayms-default-rtdb.firebaseio.com/details.json', borrowDetails)
            .then(() => {
              console.log('Book borrowing details stored successfully!');
            })
            .catch((error) => {
              console.error('Error storing borrow details: ', error);
            });
        })
        .catch((error) => {
          console.error('Error borrowing book: ', error);
        });
    }
  };

  const handleReturn = () => {
    const updatedStock = availableStock + 1;

    // Update the book's stock and isBorrowed status in Firebase
    axios
      .patch(`https://libarayms-default-rtdb.firebaseio.com/books/${bookId}.json`, {
        availableStock: updatedStock,
        isBorrowed: false,
      })
      .then(() => {
        setAvailableStock(updatedStock); 
        setIsBorrowed(false);

        // Find and delete the borrow details from the details node
        axios
          .get('https://libarayms-default-rtdb.firebaseio.com/details.json')
          .then((response) => {
            const details = response.data;

            // Loop through all details and find the matching userId and bookId
            for (let key in details) {
              const borrowDetail = details[key];
              if (borrowDetail.userId === userId && borrowDetail.bookId === bookId) {
                // If the borrow details match, delete it from Firebase
                axios
                  .delete(`https://libarayms-default-rtdb.firebaseio.com/details/${key}.json`)
                  .then(() => {
                    console.log('Borrow details deleted successfully!');
                  })
                  .catch((error) => {
                    console.error('Error deleting borrow details: ', error);
                  });
                break;
              }
            }
          })
          .catch((error) => {
            console.error('Error fetching borrow details: ', error);
          });
      })
      .catch((error) => {
        console.error('Error returning book: ', error);
      });
  };

  const handleRelatedBookClick = (id) => {
    navigate(`/book/${id}`, { state: { bookId: id } });
  };

  const getBookImage = (imageLink) => {
    // If imageLink is a full URL, return it as is, else prepend the base URL
    if (imageLink && imageLink.startsWith('http')) {
      return imageLink; // If the imageLink is already a full URL, use it directly
    }
    return `/${imageLink}`; // Otherwise, assume it's a relative path and prepend the base URL
  };

  if (!bookDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container2'>
      <div className="book-details">
        <div>
          <img src={getBookImage(bookDetails.imageLink)} alt={bookDetails.title} />
        </div>
        <div className='ptags'>
          <h2>{bookDetails.title}</h2>
          <p><strong>Author:</strong> {bookDetails.author}</p>
          <p><strong>Genre:</strong> {bookDetails.genre}</p>
          <p><strong>Publish Date:</strong> {bookDetails.publish_date}</p>
          <a href={bookDetails.link}><p>Reference here for more details</p></a>
          <div className='desc'>
            <p className='description'><strong>Description:</strong> {bookDetails.description}</p>
          </div>
          <p><strong>Available Stock:</strong> {availableStock}</p>

          {isBorrowed ? (
            <button onClick={handleReturn}>Return</button>
          ) : (
            <button onClick={handleBorrow} disabled={availableStock <= 0}>
              {availableStock <= 0 ? 'Out of Stock' : 'Borrow'}
            </button>
          )}
        </div>
      </div>

      <div className='related'>
        <h2>Related Books</h2>
      </div>

      <div className="related-books">
        {relatedBooks.map(([key, relatedBook]) => (
          <div key={key} className="related-book-card" onClick={() => handleRelatedBookClick(key)}>
            <img src={getBookImage(relatedBook.imageLink)} alt={relatedBook.title} />
            <h4>{relatedBook.title}</h4>
            <p>{relatedBook.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDetails;
