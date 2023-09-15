import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import recipeData from './data/recipeData.json';

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
        <Switch>
          <Route path="/" exact>
            <Recipes recipes={recipes} setRecipes={setRecipes} />
          </Route>
          <Route path="/add">
            <AddRecipe />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;


