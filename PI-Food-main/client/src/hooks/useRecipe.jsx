// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import { cleanDetail, getRecipeDetail } from "../redux/actions";

// const useRecipe = () => {
//   const dispatch = useDispatch();
//   const recipe = useSelector((state) => state.recipeDetail);
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getRecipeDetail(id));

//     return () => {
//       dispatch(cleanDetail());
//     };
//   }, [dispatch]);

//   return recipe;
// };

// export default useRecipe;
