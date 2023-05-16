import { useEffect } from "react";
import { RecipeContainer, SearchBar } from "./../index";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, changePage } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const currentPage = useSelector((state) => state.currentPage);

  const recipesPerPage = 15;
  const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

  //? DISPATCH PAGINATION
  const handlePageChange = (page) => {
    dispatch(changePage(page));
  };

  //? DISPATCH ALL RECIPES
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <h1>Home</h1>
      <RecipeContainer recipes={allRecipes} currentPage={currentPage} />
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
