import { useEffect, useState } from "react";
import style from "./Home.module.css";
import { RecipeContainer, SearchBar } from "./../index";
import { useDispatch, useSelector } from "react-redux";
import pagBack from "./../../img/pag-back.svg";
import pagFor from "./../../img/pag-for.svg";
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

  //? VARIABLES PAGINATION
  const recipesPerPage = 9;
  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : null;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;

  //? DISPATCH ALL RECIPES
  useEffect(() => {
    dispatch(getRecipes()).then(() => {
      setIsLoading(false);
    });
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
    if (page === "prev" && prevPage) {
      dispatch(changePage(prevPage));
    } else if (page === "next" && nextPage) {
      dispatch(changePage(nextPage));
    } else if (typeof page === "number") {
      dispatch(changePage(page));
    }
  };

  //? STATE LOADING
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading ? (
        <div className={style.loading}>
          <img
            src="https://freight.cargo.site/t/original/i/07b1d41fdbe7a8deec3608407c615f863ad7b531c4c017f18d65aba34c2d48f6/Venmo_Food_FriedDumplings.gif"
            alt="loading-home"
          />
        </div>
      ) : (
        <div>
          {/* ALL RECIPES */}
          <RecipeContainer recipes={allRecipes} currentPage={currentPage} />

          {/* PAGINATION */}
          <div className={style.pagination}>
            {/* PREVIOUS PAGE */}
            {prevPage && (
              <button
                onClick={() => handlePageChange("prev")}
                className={`${style["pagination-btn"]} ${style["pagination-btn-prev"]}`}
              >
                <img src={pagBack} alt="prev-btn" />
              </button>
            )}

            {/* CURRENT PAGE */}
            {currentPage && (
              <button
                onClick={() => handlePageChange(currentPage)}
                className={`${style["pagination-btn"]} active`}
              >
                {currentPage}
              </button>
            )}
            {/* NEXT PAGE */}
            {nextPage && (
              <button
                onClick={() => handlePageChange("next")}
                className={`${style["pagination-btn"]} ${style["pagination-btn-next"]}`}
              >
                <img src={pagFor} alt="next-btn" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
