import { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import AddRecipeForm from './AddRecipeForm'; 

function App() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch("./recipeData.json")
      .then(response => response.json())
      .then(setRecipes)
      .catch(e => console.log(e.message));
  }, []);

  // Function to remove a recipe
  const removeRecipe = (name) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== name));
  };

  // Function to add a new recipe
  const addRecipe = (recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  if (recipes === null) return;

  return (
    <div>
      <h1>Marcus' Recipe App</h1>
      
      <nav>
        <ul>
          <li>
            <Link to="/">Recipe Home Page</Link>
          </li>
          <li>
            <Link to="/add-recipe">Add Recipes Page</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <div>
              {recipes.map(recipe => (
                <Recipe 
                  key={recipe.name} 
                  recipe={recipe} 
                  onRemove={removeRecipe} 
                />
              ))}
            </div>
          } 
        />
        <Route 
          path="/add-recipe" 
          element={<AddRecipeForm onAdd={addRecipe} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
