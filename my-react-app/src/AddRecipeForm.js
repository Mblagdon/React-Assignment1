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

  // Handle changes in file input
  const handleFileChange = (e) => {
    setNewRecipe(prevState => ({ ...prevState, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();    

    const formData = new FormData();
    formData.append('name', newRecipe.name);
    formData.append('ingredients', newRecipe.ingredients);
    formData.append('directions', newRecipe.directions);
    formData.append('description', newRecipe.description);
    if (newRecipe.image) {
        formData.append('image', newRecipe.image);
    }

    fetch("/api/addRecipe", {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === "Recipe added successfully!") {
          // Assuming the backend responds with the image path
          newRecipe.image = data.imagePath; 
          onAdd(newRecipe); // Update the local state
      } else {
          console.error("Error adding recipe:", data.message);
      }
  })
  .catch(error => console.error("Error:", error));  
  };

  return (
    <Container>
      {/* Form for adding a recipe */}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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

        {/* Input for recipe image */}
        <Form.Group controlId="recipeImage">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleFileChange} />
        </Form.Group>

        {/* Button to submit the form */}
        <Button variant="primary" type="submit">Add Recipe</Button>
      </Form>
    </Container>
  );
}

export default AddRecipeForm;
