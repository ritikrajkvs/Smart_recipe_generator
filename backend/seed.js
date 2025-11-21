require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const recipes = require('./data/recipes.json');
async function seed(){
  if(!process.env.MONGO_URI){ console.error('MONGO_URI not set in backend/.env'); process.exit(1); }
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true });
  await Recipe.deleteMany({});
  await Recipe.insertMany(recipes);
  console.log('Seeded recipes to MongoDB'); process.exit();
}
seed().catch(err=>{ console.error(err); process.exit(1); });
