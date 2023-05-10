import { useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    summary: "",
    diets: [],
    healthScore: "",
    image: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    summary: "",
    diets: [],
    healthScore: "",
    image: "",
    instructions: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({
      ...form,
      [property]: value,
    });

    setForm({
      ...form,
      [property]: value,
    });
  };

  const validate = (form) => {
    //? VALIDATE HEALTH SCORE
    /^([1-9][0-9]?|100)$|^0$/.test(form.healthScore)
      ? setErrors({ ...errors, healthScore: "" })
      : setErrors({
          ...errors,
          healthScore: "Please enter a number between 0 and 100.",
        });
    if (form.healthScore === "")
      setErrors({ ...errors, healthScore: "Please enter a score." });
  };

  return (
    <form>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        <span>{errors.name}</span>
      </div>
      <div>
        <label>Summary</label>
        <input
          type="text"
          name="summary"
          value={form.summary}
          onChange={changeHandler}
        />
        <span>{errors.summary}</span>
      </div>
      <div>
        <label>Diets</label>
        <input
          type="text"
          name="diets"
          value={form.diets}
          onChange={changeHandler}
        />
        <span>{errors.diets}</span>
      </div>
      <div>
        <label>Health Score</label>
        <input
          type="text"
          name="healthScore"
          value={form.healthScore}
          onChange={changeHandler}
        />
        {errors.healthScore && <span>{errors.healthScore}</span>}
      </div>
      <div>
        <label>Image</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={changeHandler}
        />
        <span>{errors.image}</span>
      </div>
      <div>
        <label>Instructions</label>
        <input
          type="text"
          name="instructions"
          value={form.instructions}
          onChange={changeHandler}
        />
        <span>{errors.instructions}</span>
      </div>
    </form>
  );
};

export default Form;
