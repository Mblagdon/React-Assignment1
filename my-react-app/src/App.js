import './App.css';
import { useState, useEffect } from 'react';
import { recipeList } from './Recipe';


function App() {
  const [recipes, setRecipes] = useState(null);
  
  useEffect( () => {
    fetch("./recipeData.json")
    .then( response => response.json() )
    .then( setRecipes )
    .catch(e => console.log(e.message));
  }, [])

  if (recipeList == null ) return;

  return <div>
    <h1>Marcus Recipe App</h1>
  </div>
}

export default App;


