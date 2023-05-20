import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Form.module.css";

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
    name: null,
    summary: null,
    diets: null,
    healthScore: null,
    image: null,
    instructions: null,
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
        name: null,
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
      setErrors((errors) => ({ ...errors, summary: null }));
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
        diets: null,
      }));
    }

    //? HEALTH SCORE VALIDATION
    if (!form.healthScore) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Please enter a score.",
      }));
    } else if (/^([1-9][0-9]?|100)$|^0$/.test(form.healthScore)) {
      setErrors((errors) => ({ ...errors, healthScore: null }));
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
      setErrors((errors) => ({ ...errors, image: null }));
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
        instructions: null,
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
    <div className={style.form_container}>
      <form className={style.form} onSubmit={submitHandler}>
        <div className={style.name_container}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={changeHandler}
          />
          {errors.name !== null && <span>{errors.name}</span>}
        </div>
        <div className={style.summary_container}>
          <label>Summary</label>
          <input
            type="text"
            name="summary"
            value={form.summary}
            onChange={changeHandler}
          />
          {errors.summary !== null && <span>{errors.summary}</span>}
        </div>
        <div className={style.diets_container}>
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
          {errors.diets !== null && <span>{errors.diets}</span>}
        </div>
        <div className={style.hs_container}>
          <label>Health Score</label>
          <input
            type="number"
            name="healthScore"
            value={form.healthScore}
            onChange={changeHandler}
          />
          {errors.healthScore !== null && <span>{errors.healthScore}</span>}
        </div>
        <div className={style.image_container}>
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={changeHandler}
          />
          {errors.image !== null && <span>{errors.image}</span>}
        </div>
        <div className={style.inst_container}>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={changeHandler}
          />
          {errors.instructions !== null && <span>{errors.instructions}</span>}
        </div>
        <button className={style.form_button} type="submit">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default Form;
