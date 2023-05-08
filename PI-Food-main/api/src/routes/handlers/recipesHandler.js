const {
  recipesAPI,
  recipesDB,
  allRecipes,
  recipeById,
  newRecipe,
} = require("../controllers/recipesControllers");

//? GET RECIPES FROM API
const getRecipesAPI = async (req, res) => {
  try {
    const recipes = await recipesAPI();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  // recipesAPI();
};

//? GET RECIPES FROM DB
const getRecipesDB = async (req, res) => {
  try {
    const recipes = await recipesDB();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  // recipesDB();
};

//? GET ALL RECIPES
const getAllRecipes = async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await allRecipes();
    if (name) {
      const recipeName = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(name.toLowerCase())
      );
      if (recipeName.length) {
        res.status(200).send(recipeName);
      } else {
        res
          .status(400)
          .send("Oops! The recipe doesn't exist. Try another one!");
      }
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//? GET RECIPE BY ID
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).send(`Receta: ${id}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  // recipeById();
};

//? CREATE RECIPE
const createRecipe = async (req, res) => {
  try {
    const { name, image, summary, healthScore, instructions, diets } = req.body;
    const postRecipe = await newRecipe(
      name,
      image,
      summary,
      healthScore,
      instructions,
      diets
    );
    res.status(200).json(postRecipe);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  getRecipesAPI,
  getRecipesDB,
  getAllRecipes,
  getRecipeById,
  createRecipe,
};
