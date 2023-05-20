import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { RecipeContainer, SearchBar } from "./../index";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  changePage,
  orderNames,
  filterDiets,
  filterHS,
  filterSource,
} from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const currentPage = useSelector((state) => state.currentPage);

  const recipesPerPage = 9;
  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

  //? DISPATCH ALL RECIPES
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  //? DISPATCH ORDER FILTER
  const handleNameOrder = (event) => {
    dispatch(orderNames(event.target.value));
  };

  //? DISPATCH DIETS FILTER
  const handleDietsOrder = (event) => {
    dispatch(filterDiets(event.target.value));
  };

  //? DISPATCH HEALTHSCORE FILTER
  const handleHSOrder = (event) => {
    dispatch(filterHS(event.target.value));
  };

  //? DISPATCH SOURCE FILTER
  const handleSourceOrder = (event) => {
    dispatch(filterSource(event.target.value));
  };

  //? DISPATCH PAGINATION
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  return (
    <div className={style.home_container}>
      <div className={style.home_searchBar}>
        {/* SEARCHBAR */}
        <SearchBar />
      </div>

      <div className={style.filters_container}>
        {/* RECIPE ORDER (ASC/DESC) */}
        <div className={style.div_asc}>
          <select
            name="ascendantDescendant"
            className={style.select_asc}
            onChange={handleNameOrder}
          >
            <option value="" disabled selected hidden>
              Select order...
            </option>
            <option value="defaultOrder">Default Order</option>
            <option value="ascendant">Ascendant</option>
            <option value="descendant">Descendant</option>
          </select>
        </div>

        {/* DIETS ORDER */}
        <div className={style.div_diet}>
          <select
            name="diets"
            className={style.select_diet}
            onChange={handleDietsOrder}
          >
            <option value="" disabled selected hidden>
              Select diet...
            </option>
            <option value="defaultDiet">All Diets</option>
            <option value="gluten free">Gluten Free</option>
            <option value="dairy free">Dairy Free</option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="whole 30">Whole 30</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="fodmap friendly">Fodmap Friendly</option>
          </select>
        </div>

        {/* HEALTH SCORE ORDER */}
        <div className={style.div_hs}>
          <select
            name="healthScore"
            className={style.select_hs}
            onChange={handleHSOrder}
          >
            <option value="" disabled selected hidden>
              Select health score...
            </option>
            <option value="defaultScore">All health scores</option>
            <option value="75to100">75 to 100 health score</option>
            <option value="50to75">50 to 75 health score</option>
            <option value="25to50">25 to 50 health score</option>
            <option value="0to25">0 to 25 health score</option>
          </select>
        </div>

        {/* RECIPE SOURCE */}
        <div className={style.div_source}>
          <select
            name="source"
            className={style.select_source}
            onChange={handleSourceOrder}
          >
            <option value="" disabled selected hidden>
              Select source...
            </option>
            <option value="defaultSource">All sources</option>
            <option value="database">Database</option>
            <option value="api">API</option>
          </select>
        </div>
      </div>

      {/* RECIPES */}
      <RecipeContainer recipes={allRecipes} currentPage={currentPage} />

      {/* PAGINATION */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? "active" : ""}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
