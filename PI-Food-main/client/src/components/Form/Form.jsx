import { useState } from "react";
import axios from "axios";

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

    if (property === "diets") {
      const isChecked = event.target.checked;

      if (isChecked) {
        setForm((form) => ({
          ...form,
          diets: [...form.diets, value],
        }));
      } else {
        setForm((form) => ({
          ...form,
          diets: form.diets.filter((diet) => diet !== value),
        }));
      }
    } else {
      setForm({
        ...form,
        [property]: value,
      });
    }
    validate({
      ...form,
      [property]: value,
    });
  };

  const validate = (form) => {
    //? RECIPE NAME VALIDATION
    if (!form.name) {
      setErrors((errors) => ({
        ...errors,
        name: "Please enter a name for this recipe.",
      }));
    } else if (form.name.length <= 60) {
      setErrors((errors) => ({
        ...errors,
        name: "",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        name: "Please enter a name with less than 60 characters.",
      }));
    }

    //? RECIPE SUMMARY VALIDATION
    if (!form.summary) {
      setErrors((errors) => ({
        ...errors,
        summary: "Please enter a summary for this recipe.",
      }));
    } else if (form.summary.length <= 100) {
      setErrors((errors) => ({ ...errors, summary: "" }));
    } else {
      setErrors((errors) => ({
        ...errors,
        summary: "Please enter a summary with less than 100 characters.",
      }));
    }

    //? DIETS VALIDATION
    if (form.diets.length === 0) {
      setErrors((errors) => ({
        ...errors,
        diets: "Please select at least one diet.",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        diets: "",
      }));
    }

    //? HEALTH SCORE VALIDATION
    if (!form.healthScore) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Please enter a score.",
      }));
    } else if (/^([1-9][0-9]?|100)$|^0$/.test(form.healthScore)) {
      setErrors((errors) => ({ ...errors, healthScore: "" }));
    } else {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Please enter a number between 0 and 100.",
      }));
    }

    //? IMAGE VALIDATION
    if (!form.image) {
      setErrors((errors) => ({
        ...errors,
        image: "Please enter a URL to the image.",
      }));
    } else if (/^(ftp|http|https):\/\/[^ "]+\.(jpg|png)$/.test(form.image)) {
      setErrors((errors) => ({ ...errors, image: "" }));
    } else {
      setErrors((errors) => ({
        ...errors,
        image: "Please enter a valid URL.",
      }));
    }

    //? INSTRUCTIONS VALIDATION
    if (!form.instructions) {
      setErrors((errors) => ({
        ...errors,
        instructions: "Please enter the instructions for the recipe.",
      }));
    } else if (form.instructions.length <= 500) {
      setErrors((errors) => ({
        ...errors,
        instructions: "",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        instructions: "The instructions must have less than 500 characters.",
      }));
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/recipes/", form)
      .then((response) => alert(response))
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={changeHandler}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Summary</label>
        <input
          type="text"
          name="summary"
          value={form.summary}
          onChange={changeHandler}
        />
        {errors.summary && <span>{errors.summary}</span>}
      </div>
      <div>
        <label>Diets</label>
        <input
          type="checkbox"
          name="diets"
          value="gluten free"
          checked={form.diets.includes("gluten free")}
          onChange={changeHandler}
        />
        Gluten Free
        <input
          type="checkbox"
          name="diets"
          value="diary free"
          checked={form.diets.includes("diary free")}
          onChange={changeHandler}
        />
        Diary Free
        <input
          type="checkbox"
          name="diets"
          value="lacto ovo vegetarian"
          checked={form.diets.includes("lacto ovo vegetarian")}
          onChange={changeHandler}
        />
        Lacto Ovo Vegetarian
        <input
          type="checkbox"
          name="diets"
          value="vegan"
          checked={form.diets.includes("vegan")}
          onChange={changeHandler}
        />
        Vegan
        <input
          type="checkbox"
          name="diets"
          value="paleolithic"
          checked={form.diets.includes("paleolithic")}
          onChange={changeHandler}
        />
        Paleolithic
        <input
          type="checkbox"
          name="diets"
          value="primal"
          checked={form.diets.includes("primal")}
          onChange={changeHandler}
        />
        Primal
        <input
          type="checkbox"
          name="diets"
          value="whole 30"
          checked={form.diets.includes("whole 30")}
          onChange={changeHandler}
        />
        Whole 30
        <input
          type="checkbox"
          name="diets"
          value="pescatarian"
          checked={form.diets.includes("pescatarian")}
          onChange={changeHandler}
        />
        Pescatarian
        <input
          type="checkbox"
          name="diets"
          value="ketogenic"
          checked={form.diets.includes("ketogenic")}
          onChange={changeHandler}
        />
        Ketogenic
        <input
          type="checkbox"
          name="diets"
          value="fodmap friendly"
          checked={form.diets.includes("fodmap friendly")}
          onChange={changeHandler}
        />
        Fodmap Friendly
        {errors.diets && <span>{errors.diets}</span>}
      </div>
      <div>
        <label>Health Score</label>
        <input
          type="number"
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
        {errors.image && <span>{errors.image}</span>}
      </div>
      <div>
        <label>Instructions</label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={changeHandler}
        />
        {errors.instructions && <span>{errors.instructions}</span>}
      </div>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default Form;
