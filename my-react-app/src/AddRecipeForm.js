import React, { useState } from 'react';

function AddRecipeForm({ onAdd }) {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    directions: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newRecipe);
    setNewRecipe({
      name: '',
      ingredients: '',
      directions: '',
      description: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={newRecipe.name} onChange={handleChange} required />
      </label>
      <label>
        Ingredients:
        <input type="text" name="ingredients" value={newRecipe.ingredients} onChange={handleChange} required />
      </label>
      <label>
        Directions:
        <textarea name="directions" value={newRecipe.directions} onChange={handleChange} required></textarea>
      </label>
      <label>
        Description:
        <textarea name="description" value={newRecipe.description} onChange={handleChange} required></textarea>
      </label>
      <label>
        Image:
        <select name="image" value={newRecipe.image} onChange={handleChange}>
          <option value="">Placeholder</option>
          <option value="/pizza1.jpg">Pizza</option>
          <option value="/hamburger1.jpg">Hamburger</option>
          <option value="/meatloaf1.jpg">Meatloaf</option>
        </select>
      </label>
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
