import React from 'react';
import { Image, Card, Button } from 'react-bootstrap';

function Recipe({ recipe, onRemove }) {

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
        <Button variant="danger" onClick={() => {
          console.log("Remove button clicked for recipe:", recipe.name);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("recipeName", recipe.name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("/api/removeRecipe", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.message === "Recipe removed successfully!") {
                onRemove(recipe.name);
            } else {
                console.error("Error removing recipe:", result.message);
            }
        })
        .catch(error => console.log('error', error));
    }}>Remove</Button>

      </Card.Body>
    </Card>
  );
}

export default Recipe;
