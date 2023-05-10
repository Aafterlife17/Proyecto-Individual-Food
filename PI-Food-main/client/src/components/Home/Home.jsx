import { useEffect } from "react";
import { RecipeContainer } from "./../index";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <RecipeContainer />
    </div>
  );
};

export default Home;
