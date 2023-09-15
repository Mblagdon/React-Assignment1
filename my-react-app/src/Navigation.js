import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Recipes</Link></li>
        <li><Link to="/add">Add Recipe</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
