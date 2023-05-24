import React, { Component } from "react";
import { connect } from "react-redux";
import { searchRecipe, getRecipes } from "../../redux/actions";
import search from "./../../assets/img/search.svg";
import refresh from "./../../assets/img/refresh.svg";
import style from "./SearchBar.module.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  //? ONSEARCH RECIPE
  onSearch = () => {
    this.props.searchRecipe(this.state.name);
  };

  //? HANDLE INPUT CHANGE
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  //? RESET BUTTON
  handleReset = () => {
    this.setState({ name: "" });
    this.props.getRecipes();
  };

  render() {
    return (
      <div className={style.searchBar}>
        <input
          type="search"
          onChange={this.handleChange}
          placeholder="What are you looking for?"
        />
        {/* SEARCH BUTTON */}
        <div className={style.search_cont}>
          <button className={style.search_button} onClick={this.onSearch}>
            <img src={search} alt="search-icon" />
            Search
          </button>
        </div>

        {/* RESET BUTTON */}
        <div className={style.refresh_cont}>
          <button className={style.refresh_button} onClick={this.handleReset}>
            <img src={refresh} alt="refresh-icon" />
            Reset
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  searchRecipe,
  getRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
