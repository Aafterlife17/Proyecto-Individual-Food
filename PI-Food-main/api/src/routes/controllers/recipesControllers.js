require("dotenv").config();
const axios = require("axios");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Recipe, Diet } = require("./../../db");
const { KEY, URL } = process.env;

//? GET RECIPES API
const recipesAPI = async () => {
  const apiURL = await axios.get(
    `${URL}complexSearch?apiKey=${KEY}&addRecipeInformation=true&number=100`
  );
  const recipes = apiURL.data.results.map((result) => {
    const steps = result.analyzedInstructions.flatMap((instruction) =>
      instruction.steps.map((step) => step.step)
    );
    return {
      id: result.id,
      name: result.title,
      image: result.image,
      summary: result.summary.substring(0, 300),
      healthScore: result.healthScore,
      instructions: steps,
      Diets: result.diets.map((diet) => ({ name: diet })),
    };
  });
  return recipes;
};

//? GET RECIPES DB
const recipesDB = async () => {
  const recipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipes;
};

//? GET ALL RECIPES CONTROLLER
const allRecipes = async () => {
  const allRecipesDB = await recipesDB();
  const allRecipesAPI = await recipesAPI();
  const recipesTotal = allRecipesDB.concat(allRecipesAPI);
  return recipesTotal;
};

//? GET RECIPES BY ID CONTROLLER
const recipeById = async () => {
  //`${URL}complexSearch?id=${id}&apiKey=${KEY}&addRecipeInformation=true`
};

//? CREATE RECIPE CONTROLLER
const newRecipe = async (
  name,
  image,
  summary,
  healthScore,
  instructions,
  diets
) => {
  const recipeDB = await Recipe.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  if (recipeDB.length)
    return "Oops, that recipe already exists! Please create a new one";

  const newRecipe = await Recipe.create({
    name: name,
    image: image,
    summary: summary,
    healthScore: healthScore,
    instructions: instructions,
  });

  const dietDB = await Diet.findAll({
    where: { name: diets },
  });

  newRecipe.addDiets(dietDB);
};

module.exports = {
  recipesAPI,
  recipesDB,
  allRecipes,
  recipeById,
  newRecipe,
};
