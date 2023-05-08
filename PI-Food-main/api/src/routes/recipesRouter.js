const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getRecipesAPI,
  getRecipesDB,
} = require("./handlers/recipesHandler");

const recipesRouter = Router();

//? GET RECIPES FROM API (only for filtering)
recipesRouter.get("/api", getRecipesAPI);

//? GET RECIPES FROM DB (only for filtering)
recipesRouter.get("/db", getRecipesDB);

//? GET ALL RECIPES
recipesRouter.get("/", getAllRecipes);

//? GET RECIPE BY ID
recipesRouter.get("/:id", getRecipeById);

//? CREATE RECIPE
recipesRouter.post("/", createRecipe);

module.exports = recipesRouter;
