import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Recipe.module.css";
import readmoreicon from "./../../img/readmore-icon.svg";

const Recipe = (props) => {
  return (
    <div className={style.recipe_card}>
      <img className={style.recipe_img} src={props.image} alt="" />
      <div className={style.recipe_content}>
        <h3 className={style.recipe_h3}>
          {props.name} &#x2022; HS: {props.healthScore}
        </h3>

        <div className={style.recipe_diets}>
          <span className={style.recipe_span}>{props.diets}</span>
        </div>
      </div>

      <div className={style.recipe_footer}>
        <Link to={`/detail/${props.id}`}>
          <div className={style.recipe_buttonContainer}>
            <h4 className={style.recipe_button}>Read more</h4>
            <img
              src={readmoreicon}
              alt="read more"
              className={style.recipe_icon}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
