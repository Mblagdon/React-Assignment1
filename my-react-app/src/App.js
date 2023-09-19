import { useState, useEffect } from 'react';
import Recipe from './Recipe';
import { Route, Link, Routes } from 'react-router-dom';

function App() {
  const [recipes, setRecipes] = useState(null);
  
  useEffect(() => {
    fetch("./recipeData.json")
    .then(response => response.json())
    .then(setRecipes)
    .catch(e => console.log(e.message));
  }, []);

  if (!recipes) return <div>Trying to load!</div>;

  return (
    <div>
      <h1>Marcus Recipe App</h1>
      
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
        <Route path="/" element={<div>{recipes.map(recipe => (<Recipe key={recipe.name} recipe={recipe} />))}</div>} />
        <Route path="/add-recipe" element={<div>Add Recipe Form Goes Here</div>} />
      </Routes>
    </div>
  );
}

export default App;
