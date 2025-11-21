import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import Suggested from './pages/Suggested';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
export default function App(){
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/results' element={<Results/>}/>
            <Route path='/recipe/:id' element={<RecipeDetails/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/suggested' element={<Suggested/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
