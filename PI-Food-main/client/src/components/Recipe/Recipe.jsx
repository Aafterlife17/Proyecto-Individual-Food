import { Link } from "react-router-dom/cjs/react-router-dom.min";
import style from "./Recipe.module.css";

const Recipe = (props) => {
  return (
    <div className={style.recipe_card}>
      <img className={style.recipe_img} src={props.image} alt="" />
      <div className={style.recipe_content}>
        <h3 className={style.recipe_h3}>
          {props.name} &#x2022; HS: {props.healthScore}
        </h3>
        <div className={style.diets_container}>
          <div className={style.recipe_diets}>{props.diets}</div>
        </div>
      </div>

      <div className={style.recipe_footer}>
        <Link to={`/detail/${props.id}`}>
          <h4 className={style.recipe_button}>Read more</h4>
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
