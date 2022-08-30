import React, { Component } from "react";
import { Link } from 'react-router-dom'
import style from "./Nav.module.css";

export default class Nav extends Component {
  render() {
    return (
      <div className={style.nav}>
        <Link className={style.linkGames} to="/home"><span>★</span> PI-Videogames</Link>
        {
          window.location.href.slice(-7) === "/create" ? null : <Link className={style.linkCreate} to="/create">Create Game</Link>
        }
      </div>
    );
  }
}