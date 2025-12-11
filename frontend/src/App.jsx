import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';
import { setFavorites } from './utils/recipeSlice';

import Home from './pages/Home';
import Results from './pages/Results';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Suggested from './pages/Suggested';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Layout component to handle initial data fetching
const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
            headers: { 'x-auth-token': token }
          });
          // Dispatch user data to Redux
          dispatch(addUser(res.data));
          // Dispatch favorites to Redux
          if (res.data.favorites) {
            dispatch(setFavorites(res.data.favorites));
          }
        } catch (err) {
          console.error("Session load failed", err);
          localStorage.removeItem('token');
        }
      }
    };
    loadUser();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Public Routes */}
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />

          {/* Protected Routes */}
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='results' element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path='recipe/:id' element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
          <Route path='favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path='suggested' element={<ProtectedRoute><Suggested /></ProtectedRoute>} />

          {/* Catch All */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
