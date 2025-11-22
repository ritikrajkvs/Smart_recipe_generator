# Smart Recipe Generator 🥗

A full-stack, AI-powered application that suggests recipes based on the ingredients you have available. Users can manually input ingredients or simply snap a photo of their fridge/pantry to get instant recipe recommendations complete with nutritional information and cooking instructions.

## 🚀 Live Demo

- **Frontend (Netlify):** [https://smartrecipecc.netlify.app/](https://smartrecipecc.netlify.app/)
- **Backend (Render):** [https://smart-recipe-genbakend.onrender.com](https://smart-recipe-genbakend.onrender.com)

---

## ✨ Key Features

- **📸 AI Ingredient Recognition:** Upload a photo of your ingredients, and the app uses Google Vision AI to automatically detect and list them.
- **🔍 Smart Recipe Matching:** Sophisticated algorithm that ranks recipes based on ingredient availability, prioritizing recipes you can cook *right now*.
- **🥗 Dietary & Custom Filters:** Filter results by dietary preferences (Vegetarian, Vegan, Gluten-Free), difficulty level, and cooking time.
- **📊 Nutritional Analysis:** Detailed breakdown of calories, protein, fats, and carbs for every recipe.
- **👤 User Accounts:** Secure Login/Signup functionality using JWT authentication.
- **❤️ Saved Recipes:** Authenticated users can save their favorite recipes to their profile (cloud-synced).
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop devices using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router DOM
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS
- **AI Integration:** Google Cloud Vision API (Image Classification)

--
