import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Recipe = (props) => {
  return (
    <div>
      <img src={props.image} alt="" />
      <h3>{props.name}</h3>
      <span>{props.diets}</span>

      <Link to={`/detail/${props.id}`}>
        <button>Read more</button>
      </Link>
    </div>
  );
};

export default Recipe;
