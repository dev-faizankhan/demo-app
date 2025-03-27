import axios from 'axios';

const BASE_URL = 'https://data.smartchain.consulting';

class ApiService {
    // Utility method to get headers with token
    static getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    // Authentication Methods
    static async signup(username, password) {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, { username, password });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Signup failed');
        }
    }

    static async login(username, password) {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { username, password });
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Login failed');
        }
    }

    // Book-related Methods
    static async fetchBook(bookId) {
        try {
            const response = await axios.post(`${BASE_URL}/fetch_book`, { book_id: bookId });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Fetch book failed');
        }
    }

    static async saveBook(bookId) {
        try {
            const response = await axios.post(`${BASE_URL}/save_book`,
                { book_id: bookId },
                { headers: this.getHeaders() }
            );
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Save book failed');
        }
    }

    static async getUserBooks() {
        try {
            const response = await axios.get(`${BASE_URL}/books`, {
                headers: this.getHeaders()
            });
            return response.data.books;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Fetch user books failed');
        }
    }

    static async getBookDetails(bookId) {
        const token = localStorage.getItem('token');
        console.log('token', token);


        try {
            const response = await axios.get(`${BASE_URL}/book/${bookId}`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Fetch book details failed');
        }
    }

    // Text Analysis Method
    static async analyzeText(text) {
        try {
            const response = await axios.post(`${BASE_URL}/analyze`, { text });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Text analysis failed');
        }
    }
}

export default ApiService;