import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const token = localStorage.getItem('token');

  // If there is a token but no user yet, assume loading
  if (token && !user) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  // If no user and no token, redirect
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
