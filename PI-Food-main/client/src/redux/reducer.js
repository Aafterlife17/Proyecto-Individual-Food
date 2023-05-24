import {
  GET_RECIPES,
  GET_RECIPE_DETAIL,
  CLEAN_DETAIL,
  GET_RECIPE_NAME,
  CHANGE_PAGE,
  ORDER_NAMES,
  FILTER_DIETS,
  FILTER_HS,
  FILTER_SOURCE,
} from "./actions";

const initialState = {
  allRecipes: [],
  originalRecipes: [],
  additionalFilter: [],
  recipeDetail: {},
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //? ALL RECIPES
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        originalRecipes: action.payload,
        additionalFilter: action.payload,
      };

    //? RECIPE DETAIL
    case GET_RECIPE_DETAIL:
      return { ...state, recipeDetail: action.payload };

    case CLEAN_DETAIL:
      return {
        ...state,
        recipeDetail: {},
      };

    //? SEARCH BY NAME
    case GET_RECIPE_NAME:
      return {
        ...state,
        allRecipes: action.payload,
        originalRecipes: action.payload,
        additionalFilter: action.payload,
      };

    //? ORDER RECIPES
    case ORDER_NAMES:
      if (action.payload === "defaultOrder") {
        return {
          ...state,
          allRecipes: state.originalRecipes,
        };
      }

      let orderedRecipes = [...state.allRecipes].sort((a, b) => {
        if (action.payload === "ascendant") {
          return a.name.localeCompare(b.name);
        } else if (action.payload === "descendant") {
          return b.name.localeCompare(a.name);
        }
      });

      return {
        ...state,
        allRecipes: orderedRecipes,
        additionalFilter: orderedRecipes,
      };

    //? FILTER DIETS
    case FILTER_DIETS:
      if (action.payload === "defaultDiet") {
        return {
          ...state,
          allRecipes: state.originalRecipes,
        };
      } else {
        let filteredDiets = state.originalRecipes.filter((recipe) =>
          recipe.Diets.some((diet) => diet.name === action.payload)
        );
        return {
          ...state,
          allRecipes: filteredDiets,
          additionalFilter: filteredDiets,
        };
      }

    //? FILTER HEALTH SCORE
    case FILTER_HS:
      if (action.payload === "defaultScore") {
        return {
          ...state,
          allRecipes: state.originalRecipes,
        };
      } else if (action.payload === "0to25") {
        let filtered25 = state.additionalFilter.filter(
          (recipe) => recipe.healthScore <= 25
        );
        return {
          ...state,
          allRecipes: filtered25,
          additionalFilter: filtered25,
        };
      } else if (action.payload === "25to50") {
        let filtered50 = state.additionalFilter.filter(
          (recipe) => recipe.healthScore >= 25 && recipe.healthScore <= 50
        );
        return {
          ...state,
          allRecipes: filtered50,
          additionalFilter: filtered50,
        };
      } else if (action.payload === "50to75") {
        let filtered75 = state.additionalFilter.filter(
          (recipe) => recipe.healthScore >= 50 && recipe.healthScore <= 75
        );
        return {
          ...state,
          allRecipes: filtered75,
          additionalFilter: filtered75,
        };
      } else if (action.payload === "75to100") {
        let filtered100 = state.additionalFilter.filter(
          (recipe) => recipe.healthScore >= 75 && recipe.healthScore <= 100
        );
        return {
          ...state,
          allRecipes: filtered100,
          additionalFilter: filtered100,
        };
      }

    //? FILTER SOURCE
    case FILTER_SOURCE:
      if (action.payload === "defaultSource") {
        return {
          ...state,
          allRecipes: state.originalRecipes,
        };
      } else if (action.payload === "database") {
        let filteredSource = state.additionalFilter.filter(
          (recipe) => recipe.createdInDB === true
        );
        return {
          ...state,
          allRecipes: filteredSource,
        };
      } else {
        let filteredSource = state.additionalFilter.filter(
          (recipe) => recipe.createdInDB !== true
        );
        return {
          ...state,
          allRecipes: filteredSource,
        };
      }

    //? PAGINATION
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
