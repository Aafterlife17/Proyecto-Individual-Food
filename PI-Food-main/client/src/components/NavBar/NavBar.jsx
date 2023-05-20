import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./NavBar.module.css";
// import { plateHeader } from "./../../img/plate-header.svg";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.navbar}>
        <div className={style.header_links}>
          <Link to="/home">
            <h4 className={style.header_home}>Home</h4>
          </Link>
          <Link to="/create">
            <h4 className={style.header_new}>New Recipe</h4>
          </Link>
          <Link to="/">
            <h4 className={style.header_exit}>Exit</h4>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
