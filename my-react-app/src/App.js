import './App.css';
import { useState, useEffect } from 'react';
import recipeData from './recipeData.json';

function Home() {
  return (
    <div>
      <h1>Marcus' React Recipe App</h1>
    </div>
  );
}

function recipes() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}

function add() {
  return (
    <div>
      <h1> Add Recipes</h1>
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;


