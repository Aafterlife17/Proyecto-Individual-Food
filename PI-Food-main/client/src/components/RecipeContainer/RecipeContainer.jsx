import { useEffect } from "react";
import Recipe from "../Recipe/Recipe";
import { changePage } from "../../redux/actions";
import { useDispatch } from "react-redux";

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
    <div>
      {recipesToShow.map((recipe) => {
        return (
          <Recipe
            id={recipe.id}
            image={recipe.image}
            name={recipe.name}
            diets={recipe.Diets.map((diet) => (
              <span key={diet.name}>{diet.name}</span>
            ))}
          />
        );

        // return (
        //   <Recipe
        //     id={recipes.id}
        //     image={recipes.image}
        //     name={recipes.name}
        //     diets={dietSpans}
        //   />
        // );
      })}
    </div>
  );
};

export default RecipeContainer;
