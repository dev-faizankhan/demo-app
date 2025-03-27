import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import ApiService from '../services/ApiService';

const TextAnalysis = () => {
    const [text, setText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyzeText = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await ApiService.analyzeText(text);
            setAnalysisResult(result?.data);
        } catch (err) {
            setError(err.message || 'Text analysis failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Text Analysis</h2>
            <Form onSubmit={handleAnalyzeText}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter Text for Analysis</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here..."
                        required
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze Text'}
                </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            {analysisResult && (
                <Card className="mt-4">
                    <Card.Header>Analysis Results</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <strong>Sentiment:</strong> {analysisResult.sentiment}
                        </Card.Text>
                        <Card.Text>
                            <strong>Summary:</strong> {analysisResult.summary}
                        </Card.Text>
                        <Card.Text>
                            <strong>Named Entities:</strong> {analysisResult.ner}
                        </Card.Text>
                        <Card.Text>
                            <strong>Key Characters:</strong> {analysisResult.characters}
                        </Card.Text>
                        <Card.Text>
                            <strong>Plot Summary:</strong> {analysisResult.plot_summary}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default TextAnalysis;