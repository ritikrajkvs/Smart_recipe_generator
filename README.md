Smart Recipe Generator - Final (MongoDB-enabled)

Local setup:
1. Backend
   - cd backend
   - npm install
   - copy .env.example to .env and set MONGO_URI and HF_API_KEY
   - npm run seed   # once, to populate MongoDB
   - npm run dev    # or npm start

2. Frontend
   - cd frontend
   - npm install
   - npm run dev

Notes:
- Replace HF_API_KEY with your HuggingFace inference token.
- On deployment, set environment variables on the host (Render/Vercel).
