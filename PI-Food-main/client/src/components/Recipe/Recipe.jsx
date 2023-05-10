const Recipe = (props) => {
  return (
    <div>
      <img src={props.image} />
      <h3>{props.name}</h3>
      <span>{props.diets}</span>
      <button>Read more</button>
    </div>
  );
};

export default Recipe;
