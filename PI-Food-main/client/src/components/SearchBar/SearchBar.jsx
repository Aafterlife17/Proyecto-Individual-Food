import { useState } from "react";
import { searchRecipe, getRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";

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
      <input type="search" onChange={handleChange} />
      <button onClick={onSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SearchBar;
