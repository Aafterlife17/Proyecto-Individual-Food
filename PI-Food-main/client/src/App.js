import "./App.css";
import { Detail, Form, Home, Landing, NavBar } from "./components/index";
import { Route, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function App() {
  const location = useLocation();

  //? LOCAL STATE RECIPES
  const [recipe, setRecipe] = useState([]);

  //? ON SEARCH
  const onSearch = async (name) => {
    const recipeName = await axios.get(
      `http://localhost:3001/recipes?name=${name}`
    );
    if (recipeName.data) {
      setRecipe(recipeName.data);
    } else {
      window.alert("There isn't a recipe with that name. Try again!");
    }
  };

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar onSearch={onSearch} />}
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/detail/:id">
        <Detail />
      </Route>
      <Route exact path="/create">
        <Form />
      </Route>
    </div>
  );
}

export default App;
