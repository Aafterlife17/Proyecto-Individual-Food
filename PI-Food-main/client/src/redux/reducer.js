import {
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAN_DETAIL,
  GET_RECIPE_NAME,
  CHANGE_PAGE,
} from "./actions";

const initialState = {
  allRecipes: [],
  recipeDetail: {},
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipeByName: action.payload,
        allRecipes: action.payload,
      };

    case GET_RECIPE_DETAIL:
      return { ...state, recipeDetail: action.payload };

    case CLEAN_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };

    case GET_RECIPE_NAME:
      return { ...state, allRecipes: action.payload };

    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
