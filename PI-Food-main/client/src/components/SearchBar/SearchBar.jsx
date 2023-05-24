import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipe, getRecipes } from "../../redux/actions";
import search from "./../../assets/img/search.svg";
import refresh from "./../../assets/img/refresh.svg";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  //? NAME STATE
  const [name, setName] = useState("");

  //? ONSEARCH RECIPE
  const onSearch = () => {
    dispatch(searchRecipe(name));
  };

  //? HANDLE INPUT CHANGE
  const handleChange = (event) => {
    setName(event.target.value);
  };

  //? RESET BUTTON
  const handleReset = () => {
    setName("");
    dispatch(getRecipes());
  };

  return (
    <div className={style.searchBar}>
      <input
        type="search"
        onChange={handleChange}
        placeholder="What are you looking for?"
      />
      {/* SEARCH BUTTON */}
      <div className={style.search_cont}>
        <button className={style.search_button} onClick={onSearch}>
          <img src={search} alt="search-icon" />
          Search
        </button>
      </div>

      {/* RESET BUTTON */}
      <div className={style.refresh_cont}>
        <button className={style.refresh_button} onClick={handleReset}>
          <img src={refresh} alt="refresh-icon" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
