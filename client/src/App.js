import './App.css';
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import GameDetail from "./components/GameDetail";
import CreateGame from "./components/CreateGame";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Route path="/" component={Nav} />
      <Switch>
        <Route exact path='/' render={() => {return <Redirect to="/home" />}} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame/:id" component={GameDetail} />
        <Route exact path="/create" component={CreateGame} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
