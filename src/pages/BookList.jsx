import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from './../services/ApiService';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const userBooks = await ApiService.getUserBooks();
                setBooks(userBooks);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2>My Books</h2>
            {books.length === 0 ? (
                <Alert variant="info">No books saved yet</Alert>
            ) : (
                <ListGroup>
                    {books.map((book) => (
                        <ListGroup.Item
                            key={book._id}
                            action
                            // onClick={() => handleBookClick(book.book_id)}
                            className='flex-1 d-flex justify-content-between align-items-center'
                        >
                            Book ID: {book.book_id}
                            <small className="text-muted ml-2">
                                Saved on: {new Date(book.created_at).toLocaleDateString()}
                            </small>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            <Button
                variant="primary"
                className="mt-3"
                onClick={() => navigate('/fetch-book')}
            >
                Fetch New Book
            </Button>
        </Container>
    );
}

export default BookList;