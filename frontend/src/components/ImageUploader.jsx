import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onIngredientsDetected }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      setLoading(true);

      try {
        const res = await axios.post("http://localhost:5000/api/classify", {
          image: base64Image,
        });

        if (res.data.success) {
          const names = res.data.ingredients.map((i) =>
            i.name.toLowerCase().trim()
          );
          onIngredientsDetected(names);
        } else {
          alert("Ingredient detection failed.");
        }
      } catch (err) {
        console.error(err);
        alert("AI classification failed — check backend log.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md">
        Upload Image
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <img
          src={preview}
          className="w-40 h-40 object-cover mt-4 rounded-md"
          alt="preview"
        />
      )}

      {loading && <p className="text-blue-600 mt-2">Detecting ingredients...</p>}
    </div>
  );
};

export default ImageUploader;
