import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Suggested from './pages/Suggested';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './context/AppContext';

export default function App(){
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pt-20">
          <Routes>
            {/* Public Routes */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>

            {/* Protected Routes (Require Login) */}
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/results' element={<ProtectedRoute><Results/></ProtectedRoute>}/>
            <Route path='/recipe/:id' element={<ProtectedRoute><RecipeDetails/></ProtectedRoute>}/>
            <Route path='/favorites' element={<ProtectedRoute><Favorites/></ProtectedRoute>}/>
            <Route path='/suggested' element={<ProtectedRoute><Suggested/></ProtectedRoute>}/>

            {/* Catch all: Redirect unknown pages to Home (which will redirect to Login if needed) */}
            <Route path='*' element={<Navigate to="/" replace />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
