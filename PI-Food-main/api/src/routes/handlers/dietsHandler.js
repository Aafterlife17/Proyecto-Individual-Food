const allDiets = require("./../controllers/dietsControllers");

//? GET ALL DIETS HANDLER
const getAllDiets = async (req, res) => {
  try {
    const allDietsAPI = await allDiets();
    res.status(200).send(allDietsAPI);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = getAllDiets;
