import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { cleanDetail, getRecipeDetail } from "../../redux/actions";
import style from "./Detail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipeDetail(id));

    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

  console.log(recipe);

  return (
    <div className={style.detail_container}>
      {recipe[0] ? (
        <div className={style.recipe}>
          <img className={style.recipe_img} src={recipe[0].image} alt="" />
          <h2 className={style.recipe_h2}>{recipe[0].name}</h2>
          <p className={style.recipe_p}>{recipe[0].healthScore}</p>
          <div className={style.recipe_diets}>
            {recipe[0].Diets.map((diet) => (
              <span key={diet.name}>{diet.name}</span>
            ))}
          </div>

          <div>
            <p className={style.recipe_summary}>{recipe[0].summary}</p>
            <p className={style.recipe_inst}>{recipe[0].instructions}</p>
          </div>
        </div>
      ) : (
        <img
          src="https://media1.giphy.com/media/nrSRWL9TNU3LiSKznp/giphy.gif?cid=6c09b9520drhywox3pp2f8b9ajbzm1z7c3dhofsegfdl107c&ep=v1_stickers_related&rid=giphy.gif&ct=s"
          alt=""
        ></img>
      )}
    </div>
  );
};

export default Detail;
