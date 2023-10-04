// ensuring everything saved
import { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import AddRecipeForm from './AddRecipeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

// React Bootstrap imports
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';

function App() {
  // State to hold list of recipes
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes data from backend
  useEffect(() => {
    fetch("/api/recipes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => setRecipes(data))
      .catch(error => console.log(error.message));
  }, []);

  // Function to remove recipe by name
  const removeRecipe = (name) => {
    fetch(`/api/removeRecipe/${name}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Recipe removed successfully!") {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.name !== name));
      } else {
        console.error("Error removing recipe:", data.message);
      }
    })
    .catch(error => console.error("Error:", error));
  };

  // Function to add a recipe
  const addRecipe = (recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  return (
    <Container style={{ backgroundColor: 'lightblue', minHeight: '100vh' }}>
      {/* Navbar for navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
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
      <Routes>
        {/* Display the list of recipes */}
        <Route 
          path="/" 
          element={
            <div>
              {recipes.map(recipe => (
                <Row key={recipe.name} className="mb-4">
                  <Col>
                    <Recipe recipe={recipe} onRemove={removeRecipe} />
                  </Col>
                </Row>
              ))}
            </div>
          } 
        />
        {/* Form to add new recipes */}
        <Route 
          path="/add-recipe" 
          element={
            <Row>
              <Col>
                <AddRecipeForm onAdd={addRecipe} />
              </Col>
            </Row>
          } 
        />
      </Routes>
    </Container>
  );
}

export default App;