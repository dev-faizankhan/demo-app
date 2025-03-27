import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ApiService from '../services/ApiService';

const BookDetail = () => {
    const [bookDetails, setBookDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const details = await ApiService.getBookDetails(bookId);
                setBookDetails(details);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

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
            <Card>
                <Card.Header>
                    <h2>{bookDetails.title}</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{
                        maxHeight: '500px',
                        overflowY: 'auto',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {bookDetails.content.substring(0, 5000)}...
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default BookDetail;