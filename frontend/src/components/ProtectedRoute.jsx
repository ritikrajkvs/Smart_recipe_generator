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
    // FIX: Redirect unauthenticated users to the Signup page
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
