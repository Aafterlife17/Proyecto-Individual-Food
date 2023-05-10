import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = () => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/create">New Recipe</Link>
      <Link to="/">Exit</Link>
    </div>
  );
};

export default NavBar;
