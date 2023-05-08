const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getRecipesAPI,
  getRecipesDB,
} = require("./handlers/recipesHandler");

const recipesRouter = Router();

//? GET RECIPES FROM API ROUTE (FILTERING)
recipesRouter.get("/api", getRecipesAPI);

//? GET RECIPES FROM DB ROUTE (FILTERING)
recipesRouter.get("/db", getRecipesDB);

//? GET ALL RECIPES ROUTE
recipesRouter.get("/", getAllRecipes);

//? GET RECIPE BY ID ROUTE
recipesRouter.get("/:id", getRecipeById);

//? CREATE RECIPE ROUTE
recipesRouter.post("/", createRecipe);

module.exports = recipesRouter;
