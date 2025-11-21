import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import IngredientInput from '../components/IngredientInput';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { ingredients, setIngredients } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ingredients.length === 0) {
      alert('Please add ingredients manually or upload an image.');
      return;
    }
    navigate('/results');
  };

  return (
    <div className="p-5 max-w-2xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-4">Smart Recipe Generator</h1>
      <p className="text-gray-600 text-center mb-6">
        Upload an image of ingredients or add them manually.
      </p>
      
      {/* --- FIX IS HERE: Removed .map(d=>d.name) --- */}
      <ImageUploader 
        onIngredientsDetected={(detected) => 
          setIngredients(prev => [...new Set([...prev, ...detected])])
        } 
      />
      
      <IngredientInput />
      
      <div className="mt-6">
        <button 
          onClick={handleSearch} 
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Find Recipes
        </button>
      </div>
    </div>
  );
};

export default Home;