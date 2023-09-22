import { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import AddRecipeForm from './AddRecipeForm'; 
import 'bootstrap/dist/css/bootstrap.min.css';


import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function App() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    fetch("./recipeData.json")
      .then(response => response.json())
      .then(setRecipes)
      .catch(e => console.log(e.message));
  }, []);

  const removeRecipe = (name) => {
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== name));
  };

  const addRecipe = (recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  if (recipes === null) return null;

  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Marcus' Recipe App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Recipe Home Page</Nav.Link>
            <Nav.Link as={Link} to="/add-recipe">Add Recipes Page</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row className="mt-4">
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
}

export default App;
