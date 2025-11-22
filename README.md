# 🥗 Smart Recipe Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)
![Status](https://img.shields.io/badge/status-live-success.svg)

> **Turn your fridge into a feast.** An AI-powered culinary assistant that helps users minimize food waste and discover delicious recipes based on ingredients they already have.

---

## 📑 Table of Contents
- [📍 Overview](#-overview)
- [🚀 Live Demo](#-live-demo)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#-tech-stack)
- [⚙️ Architecture](#-architecture)
- [🔧 Installation & Setup](#-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [📖 API Reference](#-api-reference)
- [🚀 Deployment](#-deployment)
- [👨‍💻 Author](#-author)

---

## 📍 Overview

The **Smart Recipe Generator** addresses the common dilemma of "what to cook" by leveraging Artificial Intelligence. Unlike traditional recipe apps that require manual searching, this application allows users to simply **upload a photo of their refrigerator or pantry**.

Using **Google Cloud Vision API**, the system identifies ingredients from the image and cross-references them with a robust database to suggest the most relevant recipes. It features a secure user authentication system, allowing users to save their favorite meals and track their culinary journey.

---

## 🚀 Live Demo

Experience the application live:

| Component | Platform | URL |
| :--- | :--- | :--- |
| **Frontend** | Netlify | [https://smartrecipecc.netlify.app/](https://smartrecipecc.netlify.app/) |
| **Backend** | Render | [https://smart-recipe-genbakend.onrender.com](https://smart-recipe-genbakend.onrender.com) |

---

## ✨ Key Features

### 🤖 AI & Automation
- **Visual Ingredient Detection:** Seamless integration with Google Vision AI to identify ingredients from user-uploaded images.
- **Smart Matching Algorithm:** Proprietary logic to rank recipes based on the percentage of matching ingredients.

### 👤 User Experience
- **Secure Authentication:** Full Login/Signup functionality using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
- **Personalized Profile:** Authenticated users can save favorites, which are synced to the cloud via MongoDB.
- **Interactive Filters:** Users can filter recipes by **Dietary Preferences** (Vegan, Gluten-Free), **Cooking Time**, and **Difficulty**.

### 📊 Data & Insights
- **Nutritional Breakdown:** Detailed macronutrient data (Calories, Protein, Carbs, Fats) for every recipe.
- **Dynamic Scaling:** Users can adjust serving sizes, and ingredient quantities update automatically.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** [React.js](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Modern utility-first CSS)
- **State Management:** React Context API
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios

### **Backend**
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (NoSQL)
- **ODM:** Mongoose
- **AI Services:** Google Cloud Vision API
- **Authentication:** JWT, BcryptJS

---

## ⚙️ Architecture

The application follows a **Client-Server architecture**:

1.  **Client (Frontend):** Sends user inputs (text/images) to the backend.
2.  **Server (Backend):**
    * Receives images and sends them to **Google Vision API**.
    * Processes the returned labels (ingredients).
    * Queries **MongoDB** to find matching recipes.
    * Authenticates users and manages saved data.
3.  **Database:** Stores User profiles and the Recipe collection.

---

## 🔧 Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn
* MongoDB Atlas Connection String
* Google Cloud Vision API Key

### 1. Clone the Repository
```bash
git clone [https://github.com/ritikrajkvs/Smart_recipe_generator.git](https://github.com/ritikrajkvs/Smart_recipe_generator.git)
cd Smart_recipe_generator
