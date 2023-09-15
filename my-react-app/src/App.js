import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Recipes from './Recipes';
import AddRecipe from './AddRecipe';
import recipeData from './recipeData.json';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <Router>
      <div>
        <h1>Recipe Website</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<Recipes recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/add" element={<AddRecipe recipes={recipes} setRecipes={setRecipes} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


