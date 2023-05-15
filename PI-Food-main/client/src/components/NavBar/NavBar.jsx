import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar/SearchBar";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/home">
            <h4>Home</h4>
          </Link>
          <Link to="/create">
            <h4>New Recipe</h4>
          </Link>
          <Link to="/">
            <h4>Exit</h4>
          </Link>
        </div>
        <div>
          <SearchBar onSearch={this.props.onSearch} />
        </div>
      </div>
    );
  }
}

export default Nav;
