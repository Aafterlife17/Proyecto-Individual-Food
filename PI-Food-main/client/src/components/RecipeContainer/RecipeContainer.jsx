import Recipe from "../Recipe/Recipe";
import { useSelector } from "react-redux";

const RecipeContainer = () => {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div>
      {recipes.map((recipe) => {
        const dietSpans = recipe.Diets.map((diet) => (
          <span key={diet.name}>{diet.name}</span>
        ));

        return (
          <Recipe
            id={recipe.id}
            image={recipe.image}
            name={recipe.name}
            diets={dietSpans}
          />
        );
      })}
    </div>
  );
};

export default RecipeContainer;
