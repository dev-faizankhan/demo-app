import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import ApiService from '../services/ApiService';

const FetchBook = () => {
    const [bookId, setBookId] = useState('');
    const [bookContent, setBookContent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const bookData = await ApiService.fetchBook(parseInt(bookId));
            setBookContent(bookData);
        } catch (err) {
            setError(err.message || 'Failed to fetch book');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveBook = async () => {
        try {
            await ApiService.saveBook(parseInt(bookId));
            alert('Book saved successfully!');
        } catch (err) {
            setError(err.message || 'Failed to save book');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Fetch Book from Project Gutenberg</h2>
            <Form onSubmit={handleFetchBook}>
                <Form.Group className="mb-3">
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control
                        type="number"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                        placeholder="Enter Project Gutenberg Book ID"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch Book'}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {bookContent && (
                <Card className="mt-4">
                    <Card.Header>
                        Book Details
                        <Button
                            variant="success"
                            size="sm"
                            className="float-end"
                            onClick={handleSaveBook}
                        >
                            Save Book
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{bookContent.metadata.title}</Card.Title>
                        <Card.Text>
                            <strong>Book ID:</strong> {bookContent.metadata.book_id}
                        </Card.Text>
                        <Card.Text>
                            <strong>URL:</strong> {bookContent.metadata.url}
                        </Card.Text>
                        <Card.Text>
                            <strong>Preview:</strong>
                            {bookContent.content.substring(0, 500)}...
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default FetchBook;