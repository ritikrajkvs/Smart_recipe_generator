import React, { useState } from 'react';

const IngredientInput = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleAddIngredient = () => {
    if (input.trim() === '') return;
    if (onAdd) onAdd(input.trim());
    setInput('');
  };

  return (
    <div className="w-full space-y-4">

      {/* Input Field */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter ingredient"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none text-sm"
      />

      {/* FIXED: Add Ingredient Button stays inside screen */}
      <div className="w-full flex justify-center sm:justify-start">
        <button
          onClick={handleAddIngredient}
          className="px-5 py-2.5 bg-green-600 text-white rounded-full font-bold text-sm shadow-md hover:bg-green-700 transition-all"
        >
          Add Ingredient
        </button>
      </div>

    </div>
  );
};

export default IngredientInput;
