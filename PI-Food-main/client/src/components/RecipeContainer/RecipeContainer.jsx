import Recipe from "../Recipe/Recipe";
import { useSelector } from "react-redux";

const RecipeContainer = () => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <Recipe
            image={recipe.image}
            name={recipe.name}
            diets={recipe.Diets.map((diet) => diet.name + " ")}
          />
        );
      })}
    </div>
  );
};

export default RecipeContainer;
