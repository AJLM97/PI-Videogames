import './App.css';
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import GameDetail from "./components/GameDetail";
import CreateGame from "./components/CreateGame";
import NotFound from "./components/NotFound";
import Landing from "./components/Landing";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/videogame/:id" component={GameDetail} />
      <Route exact path="/create" component={CreateGame} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
