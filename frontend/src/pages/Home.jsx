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
      alert('Please upload an image or add ingredients first!');
      return;
    }
    navigate('/results');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Hero Header */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
          Turn your <span className="text-green-600">Fridge</span> into a <span className="text-orange-500">Feast</span>.
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Snap a photo of your ingredients or list them out. We'll tell you exactly what delicious meal you can cook right now.
        </p>

        {/* Main Action Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 mb-8">
          <div className="grid gap-8">
            
            {/* Uploader Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center justify-center gap-2">
                📸 Option 1: Scan Ingredients
              </h3>
              <ImageUploader 
                onIngredientsDetected={(detected) => 
                  setIngredients(prev => [...new Set([...prev, ...detected])])
                } 
              />
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium uppercase">Or manually add</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Manual Input Section */}
            <IngredientInput />
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={handleSearch}
          disabled={ingredients.length === 0}
          className={`w-full sm:w-auto px-12 py-4 rounded-full text-lg font-bold text-white transition-all transform hover:scale-105 shadow-lg shadow-green-200
            ${ingredients.length > 0 
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer' 
              : 'bg-slate-300 cursor-not-allowed'
            }`}
        >
          Find Matching Recipes ➜
        </button>

      </div>
    </div>
  );
};

export default Home;