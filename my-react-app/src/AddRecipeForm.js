import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function AddRecipeForm({ onAdd }) {
    // State to hold the forms input data
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    directions: '',
    description: '',
    image: ''
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newRecipe);
    // Reset form to initial state after submission
    setNewRecipe({
      name: '',
      ingredients: '',
      directions: '',
      description: '',
      image: ''
    });
  };

  return (
    <Container>
    {/* Form for adding a recipe */}
      <Form onSubmit={handleSubmit}>
        {/* Input for recipe name */}
        <Form.Group controlId="recipeName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={newRecipe.name} onChange={handleChange} required />
        </Form.Group>
        
        {/* Input for recipe ingredients */}
        <Form.Group controlId="recipeIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control type="text" name="ingredients" value={newRecipe.ingredients} onChange={handleChange} required />
        </Form.Group>

        {/* Textarea for recipe directions */}
        <Form.Group controlId="recipeDirections">
          <Form.Label>Directions</Form.Label>
          <Form.Control as="textarea" rows={3} name="directions" value={newRecipe.directions} onChange={handleChange} required />
        </Form.Group>

        {/* Textarea for recipe description */}
        <Form.Group controlId="recipeDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={newRecipe.description} onChange={handleChange} required />
        </Form.Group>

        {/* Dropdown to select recipe image */}
        <Form.Group controlId="recipeImage">
          <Form.Label>Image</Form.Label>
          <Form.Control as="select" name="image" value={newRecipe.image} onChange={handleChange}>
            <option value="">Placeholder</option>
            <option value="/pizza1.jpg">Pizza</option>
            <option value="/hamburger1.jpg">Hamburger</option>
            <option value="/meatloaf1.jpg">Meatloaf</option>
          </Form.Control>
        </Form.Group>

        {/* Button to submit the form */}
        <Button variant="primary" type="submit">Add Recipe</Button>
      </Form>
    </Container>
  );
}

export default AddRecipeForm;

