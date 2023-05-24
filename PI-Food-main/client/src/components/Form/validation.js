const validate = (
  form,
  errors,
  setErrors,
  placeholder,
  setPlaceholder,
  valid,
  setValid,
  isFormComplete
) => {
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
  if (form.name.length > 100) {
    setErrors((errors) => ({
      ...errors,
      name: "Oops! Please enter a name with less than 100 characters",
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
  if (form.summary.length > 300) {
    setErrors((errors) => ({
      ...errors,
      summary: "Oops! Please enter a summary with less than 300 characters",
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
  if (form.instructions.length > 900) {
    setErrors((errors) => ({
      ...errors,
      instructions:
        "Oops! The instructions should have less than 900 characters",
    }));
  } else {
    setErrors((errors) => ({
      ...errors,
      instructions: "",
    }));
  }

  //? ISVALID STATE
  const isValid = isFormComplete();
  setValid(isValid);
};

module.exports = validate;
