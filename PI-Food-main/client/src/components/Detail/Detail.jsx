import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import style from "./Detail.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import arrow_Back from "./../../img/arrow-back.svg";

const Detail = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const { id } = useParams();

  const [formattedSummary, setFormattedSummary] = useState("");

  useEffect(() => {
    dispatch(getRecipeDetail(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

  useEffect(() => {
    if (recipe[0] && recipe[0].summary) {
      const formattedText = recipe[0].summary.replace(/<\/?b>/g, "");
      setFormattedSummary(formattedText);
    }
  }, [recipe]);

  return (
    <div className={style.detail_container}>
      {recipe[0] ? (
        <div className={style.recipe}>
          <div className={style.image_content}>
            <img
              className={style.recipe_img}
              src={recipe[0].image}
              alt="recipe"
            />
          </div>

          <div className={style.recipe_content}>
            <div className={style.name_cont}>
              <p className={style.name_p}>{recipe[0].name}</p>
            </div>

            <div className={style.hs_cont}>
              <h3 className={style.hs_h3}>
                <span className={style.mark}>Health Score: </span>
              </h3>
              <p className={style.hs_p}>{recipe[0].healthScore}</p>
            </div>

            <div className={style.summary_cont}>
              <h3 className={style.summary_h3}>
                <span className={style.mark}>Summary:</span>
              </h3>
              <p className={style.summary_p}>{formattedSummary}</p>
            </div>

            <div className={style.diets_cont}>
              <h3 className={style.diets_h3}>
                <span className={style.mark}>Diets:</span>
              </h3>

              <div className={style.diets_span}>
                {recipe[0].Diets.map((diet) => (
                  <span key={diet.name}>&#x2022; {diet.name}</span>
                ))}
              </div>
            </div>

            <div className={style.inst_cont}>
              <h3 className={style.inst_h3}>
                <span className={style.mark}>Instructions: </span>
              </h3>
              <p className={style.inst_p}>{recipe[0].instructions}</p>
            </div>
            <Link to={`/home`}>
              <div className={style.back}>
                <img src={arrow_Back} alt="arrow back" />
                <h4>Go back to Home Page</h4>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className={style.loading}>
          <img
            src="https://freight.cargo.site/t/original/i/07b1d41fdbe7a8deec3608407c615f863ad7b531c4c017f18d65aba34c2d48f6/Venmo_Food_FriedDumplings.gif"
            alt="loading-detail"
          ></img>
        </div>
      )}
    </div>
  );
};

export default Detail;
