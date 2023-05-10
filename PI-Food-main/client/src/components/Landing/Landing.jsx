import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/home">
        <button>ENTER</button>
      </Link>
    </div>
  );
};

export default Landing;
