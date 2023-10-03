import { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import AddRecipeForm from './AddRecipeForm'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  

// React Bootstrap imports
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function App() {
  // State to hold list of recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes data from backend
  useEffect(() => {
    axios.get("/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(e => console.log(e.message));
  }, []);

  // Function to remove recipe by name
  const removeRecipe = (name) => {
    axios.delete(`/api/removeRecipe/${name}`)
    .then(response => {
        if (response.data.message === "Recipe removed successfully!") {
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== name));
        } else {
            console.error("Error removing recipe:", response.data.message);
        }
    })
    .catch(error => console.error("Error:", error));
};

  // Function to add a recipe
  const addRecipe = (recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  return (
    <Container>
      {/* Navbar for navigation */}
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

      {/* Main content */}
      <Row className="mt-4">
        <Col>
          <Routes>
            {/* Display the list of recipes */}
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
            {/* Form to add new recipes */}
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


