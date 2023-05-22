import { useEffect, useState } from "react";
import axios from "axios";
import style from "./Form.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import arrowback from "./../../img/arrow-back.svg";

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
    diets: "",
    healthScore: "",
    image: "",
    instructions: "",
  });

  const [placeholder, setPlaceholder] = useState({
    name: "Enter a name for your recipe",
    summary: "Write a short summary about it",
    healthScore: "How healthy is it? (0-100)",
    image: "Select a cool image",
    instructions: "Give us a step-by-step guide to make it",
  });

  const [valid, setValid] = useState(false);

  useEffect(() => {
    validate(form);
  }, [form]);

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
        setErrors((errors) => ({
          ...errors,
          diets: "",
        }));
      } else {
        const updatedDiets = form.diets.filter((diet) => diet !== value);
        setForm((form) => ({
          ...form,
          diets: updatedDiets,
        }));

        if (updatedDiets.length === 0) {
          setErrors((errors) => ({
            ...errors,
            diets: "Oops! Please select at least one diet",
          }));
        }
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

  const isFormComplete = () => {
    const { name, summary, diets, healthScore, image, instructions } = form;
    const {
      name: nameError,
      summary: summaryError,
      diets: dietsError,
      healthScore: healthScoreError,
      image: imageError,
      instructions: instructionsError,
    } = errors;

    return (
      name !== "" &&
      summary !== "" &&
      diets.length > 0 &&
      healthScore !== "" &&
      image !== "" &&
      instructions.length <= 500 &&
      instructions !== "" &&
      nameError === "" &&
      summaryError === "" &&
      dietsError === "" &&
      healthScoreError === "" &&
      imageError === "" &&
      instructionsError === ""
    );
  };

  const validate = (form) => {
    //? RECIPE NAME VALIDATION

    if (form.name) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        name: "",
      }));
    } else if (!form.name) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        name: "Enter a name for your recipe",
      }));
    }
    if (form.name.length > 60) {
      setErrors((errors) => ({
        ...errors,
        name: "Oops! Please enter a name with less than 60 characters",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        name: "",
      }));
    }

    //? RECIPE SUMMARY VALIDATION
    if (form.summary) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        summary: "",
      }));
    } else if (!form.summary) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        summary: "Write a short summary about it",
      }));
    }
    if (form.summary.length > 100) {
      setErrors((errors) => ({
        ...errors,
        summary: "Oops! Please enter a summary with less than 100 characters",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        summary: "",
      }));
    }

    //? HEALTH SCORE VALIDATION
    if (form.healthScore) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        healthScore: "",
      }));
    } else if (!form.healthScore) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        healthScore: "How healthy is it? (0-100)",
      }));
    }
    if (form.healthScore < 0 || form.healthScore > 100) {
      setErrors((errors) => ({
        ...errors,
        healthScore: "Oops! Please enter a number between 0 and 100",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        healthScore: "",
      }));
    }

    //? IMAGE VALIDATION
    if (form.image) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        image: "",
      }));
    } else if (!form.image) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        image: "Select a cool image",
      }));
    }
    if (
      !/^(ftp|http|https):\/\/[^ "]+\.(jpg|png)$/.test(form.image) &&
      form.image
    ) {
      setErrors((errors) => ({
        ...errors,
        image: "Oops! Please enter a valid URL.",
      }));
    } else {
      setErrors((errors) => ({ ...errors, image: "" }));
    }

    //? INSTRUCTIONS VALIDATION
    if (form.instructions) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        instructions: "",
      }));
    } else if (!form.instructions) {
      setPlaceholder((placeholder) => ({
        ...placeholder,
        instructions: "Give us a step-by-step guide to make it",
      }));
    }
    if (form.instructions.length > 500) {
      setErrors((errors) => ({
        ...errors,
        instructions:
          "Oops! The instructions should have less than 500 characters",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        instructions: "",
      }));
    }

    const isValid = isFormComplete();
    setValid(isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/recipes/", form)
      .then((response) => {
        alert(
          "Yay! The recipe was created successfully. Please go to the Home Page to see it or stay here to add a new one."
        );
        setForm({
          name: "",
          summary: "",
          diets: [],
          healthScore: "",
          image: "",
          instructions: "",
        });
        setValid(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={style.form_container}>
      <form className={style.form} onSubmit={submitHandler}>
        <div className={style.name_container}>
          <label className={style.name_label}>
            Name <span className={style.mark}></span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            className={style.name_input}
            placeholder={placeholder.name}
            onChange={changeHandler}
          />
          {errors.name !== null && (
            <span className={style.name_span}>{errors.name}</span>
          )}
        </div>
        <div className={style.summary_container}>
          <label className={style.summary_label}>
            Summary <span className={style.mark}></span>
          </label>
          <input
            type="text"
            name="summary"
            value={form.summary}
            placeholder={placeholder.summary}
            className={style.summary_input}
            onChange={changeHandler}
          />
          {errors.summary !== null && (
            <span className={style.summary_span}>{errors.summary}</span>
          )}
        </div>

        <div className={style.diets_container}>
          <label className={style.diets_label}>
            Diets <span className={style.mark}></span>
          </label>
          <div className={style.all_diets}>
            <div className={style.gluten_container}>
              <input
                type="checkbox"
                name="diets"
                value="gluten free"
                className={style.gluten_input}
                checked={form.diets.includes("gluten free")}
                onChange={changeHandler}
              />
              <label for="gluten free" className={style.gluten_label}>
                Gluten Free
              </label>
            </div>

            <div className={style.dairy_container}>
              <input
                type="checkbox"
                name="diets"
                value="dairy free"
                className={style.dairy_input}
                checked={form.diets.includes("dairy free")}
                onChange={changeHandler}
              />
              <label for="dairy free" className={style.dairy_label}>
                Dairy Free
              </label>
            </div>

            <div className={style.lacto_container}>
              <input
                type="checkbox"
                name="diets"
                className={style.lacto_input}
                value="lacto ovo vegetarian"
                checked={form.diets.includes("lacto ovo vegetarian")}
                onChange={changeHandler}
              />
              <label for="lacto ovo vegetarian" className={style.lacto_label}>
                Lacto Ovo Vegetarian
              </label>
            </div>

            <div className={style.vegan_container}>
              <input
                type="checkbox"
                name="diets"
                value="vegan"
                className={style.vegan_input}
                checked={form.diets.includes("vegan")}
                onChange={changeHandler}
              />
              <label for="vegan" className={style.vegan_label}>
                Vegan
              </label>
            </div>

            <div className={style.paleo_container}>
              <input
                type="checkbox"
                name="diets"
                value="paleolithic"
                className={style.paleo_input}
                checked={form.diets.includes("paleolithic")}
                onChange={changeHandler}
              />
              <label for="paleolithic" className={style.paleo_label}>
                Paleolithic
              </label>
            </div>

            <div className={style.primal_container}>
              <input
                type="checkbox"
                name="diets"
                value="primal"
                className={style.primal_input}
                checked={form.diets.includes("primal")}
                onChange={changeHandler}
              />
              <label for="primal" className={style.primal_label}>
                Primal
              </label>
            </div>

            <div className={style.whole_container}>
              <input
                type="checkbox"
                name="diets"
                value="whole 30"
                className={style.whole_input}
                checked={form.diets.includes("whole 30")}
                onChange={changeHandler}
              />
              <label for="whole 30" className={style.whole_label}>
                Whole 30
              </label>
            </div>

            <div className={style.pesca_container}>
              <input
                type="checkbox"
                name="diets"
                value="pescatarian"
                className={style.pesca_input}
                checked={form.diets.includes("pescatarian")}
                onChange={changeHandler}
              />
              <label for="pescatarian" className={style.pesca_label}>
                Pescatarian
              </label>
            </div>

            <div className={style.keto_container}>
              <input
                type="checkbox"
                name="diets"
                value="ketogenic"
                className={style.keto_input}
                checked={form.diets.includes("ketogenic")}
                onChange={changeHandler}
              />
              <label for="ketogenic" className={style.keto_label}>
                Ketogenic
              </label>
            </div>

            <div className={style.fodmap_container}>
              <input
                type="checkbox"
                name="diets"
                value="fodmap friendly"
                className={style.fodmap_input}
                checked={form.diets.includes("fodmap friendly")}
                onChange={changeHandler}
              />
              <label for="fodmap friendly" className={style.fodmap_label}>
                Fodmap Friendly
              </label>
            </div>
          </div>

          {errors.diets !== null && (
            <span className={style.errors_span}>{errors.diets}</span>
          )}
        </div>
        <div className={style.hs_container}>
          <label className={style.hs_label}>
            Health Score <span className={style.mark}></span>
          </label>
          <input
            type="number"
            name="healthScore"
            placeholder={placeholder.healthScore}
            className={style.hs_input}
            value={form.healthScore}
            onChange={changeHandler}
          />
          {errors.healthScore !== null && (
            <span className={style.hs_span}>{errors.healthScore}</span>
          )}
        </div>
        <div className={style.image_container}>
          <label className={style.image_label}>
            Image <span className={style.mark}></span>
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            placeholder={placeholder.image}
            className={style.image_input}
            onChange={changeHandler}
          />
          {errors.image !== null && (
            <span className={style.image_span}>{errors.image}</span>
          )}
        </div>
        <div className={style.inst_container}>
          <label className={style.inst_label}>
            Instructions <span className={style.mark}></span>
          </label>
          <textarea
            name="instructions"
            value={form.instructions}
            placeholder={placeholder.instructions}
            className={style.inst_textarea}
            onChange={changeHandler}
          />
          {errors.instructions !== null && (
            <span className={style.inst_span}>{errors.instructions}</span>
          )}
        </div>
        <button className={style.form_button} type="submit" disabled={!valid}>
          Create Recipe
        </button>

        <Link to={`/home`}>
          <div className={style.back}>
            <img src={arrowback} alt="arrow back" />
            <h4 className={style.form_back}>Go back to Home Page</h4>
          </div>
        </Link>
      </form>
    </div>
  );
};

export default Form;
