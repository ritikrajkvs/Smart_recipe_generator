require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const classifyRoute = require('./routes/classify');
const recipesRoute = require('./routes/recipes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const { MONGO_URI, PORT } = process.env;
if (MONGO_URI) {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err.message));
}

app.use('/api/classify', classifyRoute);
app.use('/api/recipes', recipesRoute);
app.use('/api/auth', require('./routes/auth')); // NEW LINE

app.get('/api/health', (_, res) => res.json({ ok: true }));

const port = PORT || 5000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));
module.exports = app;
