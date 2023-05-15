import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

export const getRecipes = () => {
  return async function (dispatch) {
    let data = await axios.get("http://localhost:3001/recipes");
    let recipes = data.data;
    dispatch({
      type: GET_RECIPES,
      payload: recipes,
    });
  };
};

export const getRecipeDetail = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({
      type: GET_RECIPE_DETAIL,
      payload: response.data,
    });
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};
