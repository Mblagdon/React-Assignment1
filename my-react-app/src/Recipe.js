import React from 'react';
import { Image } from 'react-bootstrap';


import { Card, Button } from 'react-bootstrap';

function Recipe({ recipe, onRemove }) {
  return (
    <Card className="mb-4">
      <Image src={recipe.image} alt={recipe.name} width={300} height={300} rounded />
      <Card.Body>
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text><strong>Ingredients:</strong> {recipe.ingredients}</Card.Text>
        <Card.Text><strong>Directions:</strong> {recipe.directions}</Card.Text>
        <Card.Text><strong>Description:</strong> {recipe.description}</Card.Text>
        <Button variant="danger" onClick={() => onRemove(recipe.name)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}


export default Recipe;


