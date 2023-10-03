import React from 'react';
import { Image } from 'react-bootstrap'; // React Bootstrap components
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

function Recipe({ recipe, onRemove }) {
  
  // Handle remove function
  const handleRemove = (recipeName) => {
    axios.post("/api/removeRecipe", { name: recipeName })
      .then(response => {
        if (response.data.message === "Recipe removed successfully!") {
          onRemove(recipeName);  // Update the UI by removing the recipe from the list
        } else {
          console.error("Error removing recipe:", response.data.message);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <Card className="mb-4">
      {/* Display recipe image */}
      <Image src={recipe.image} alt={recipe.name} width={300} height={300} rounded />

      {/* Display recipe details */}
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text><strong>Ingredients:</strong> {recipe.ingredients}</Card.Text>
        <Card.Text><strong>Directions:</strong> {recipe.directions}</Card.Text>
        <Card.Text><strong>Description:</strong> {recipe.description}</Card.Text>

        {/* Button to remove recipe */}
        <Button variant="danger" onClick={() => handleRemove(recipe.name)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default Recipe;
