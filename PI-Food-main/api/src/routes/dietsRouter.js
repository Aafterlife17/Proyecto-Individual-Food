const { Router } = require("express");
const getAllDiets = require("./handlers/dietsHandler");

const dietsRouter = Router();

//? GET ALL DIETS ROUTE
dietsRouter.get("/", getAllDiets);

module.exports = dietsRouter;
