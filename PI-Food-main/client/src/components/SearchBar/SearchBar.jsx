import { useState } from "react";
import { searchRecipe, getRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import search from "./../../img/search.svg";
import refresh from "./../../img/refresh.svg";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const onSearch = () => {
    dispatch(searchRecipe(name));
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

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
      <div className={style.search_cont}>
        <button className={style.search_button} onClick={onSearch}>
          <img src={search} alt="search-icon" />
          Search
        </button>
      </div>
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
