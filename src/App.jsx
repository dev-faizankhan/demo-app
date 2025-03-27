import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import FetchBook from './pages/FetchBook';
import TextAnalysis from './pages/TextAnalysis';

function App() {
  // Simple authentication check (you'll want to replace with actual auth logic)
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:bookId"
            element={
              <ProtectedRoute>
                <BookDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fetch-book"
            element={
              <ProtectedRoute>
                <FetchBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/text-analysis"
            element={
              <ProtectedRoute>
                <TextAnalysis />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;