function Recipes({ recipes, setRecipes }) {
    // This will later be used to display and manage the recipes.
    return (
      <div>
        {
          recipes.map((recipe, i) => {
            return <h2 key={i}>{recipe.name}</h2>;
          })
        }
      </div>
    );
  }
  
  export default Recipes;
  