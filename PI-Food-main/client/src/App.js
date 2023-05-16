import "./App.css";
import { Detail, Form, Home, Landing, NavBar } from "./components/index";
import { Route, useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
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
