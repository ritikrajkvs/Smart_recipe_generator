import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from './utils/userSlice';

import Home from './pages/Home';
import Results from './pages/Results';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Suggested from './pages/Suggested';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

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
          dispatch(addUser(res.data));
        } catch (err) {
          console.error("Session invalid", err);
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
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='results' element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path='recipe/:id' element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
          <Route path='favorites' element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path='suggested' element={<ProtectedRoute><Suggested /></ProtectedRoute>} />

          <Route path='*' element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
