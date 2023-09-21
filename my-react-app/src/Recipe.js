import React from 'react';

function Recipe({ recipe, onRemove }) {
  return (
    <div className="recipe">
      <h2>{recipe.name}</h2>
      <button onClick={() => onRemove(recipe.name)}>Remove</button>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Directions:</strong> {recipe.directions}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.name} />}
    </div>
  );
}

export default Recipe;


