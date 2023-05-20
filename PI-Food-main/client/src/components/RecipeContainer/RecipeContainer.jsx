import { useEffect } from "react";
import Recipe from "../Recipe/Recipe";
import { changePage } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./RecipeContainer.module.css";

const RecipeContainer = ({ recipes, currentPage }) => {
  const dispatch = useDispatch();

  //? PAGINATION
  const recipesPerPage = 9;
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const recipesToShow = recipes.slice(startIndex, endIndex);

  //? RESTART THE PAGINATION
  useEffect(() => {
    dispatch(changePage(1));
  }, [dispatch]);

  return (
    <div className={style.recipes_container}>
      <div className={style.recipe_body}>
        {recipesToShow.map((recipe) => {
          return (
            <div className={style.recipe_container}>
              <div className={style.recipe_row}>
                <Recipe
                  id={recipe.id}
                  image={recipe.image}
                  healthScore={recipe.healthScore}
                  name={recipe.name}
                  diets={recipe.Diets.map((diet) => (
                    <span key={diet.name}>{diet.name}</span>
                  ))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeContainer;
