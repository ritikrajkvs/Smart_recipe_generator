import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthLoading } = useContext(AppContext);

  if (isAuthLoading) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (!user) {
    // User not logged in? Kick them to Login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in? Show the page
  return children;
};

export default ProtectedRoute;
