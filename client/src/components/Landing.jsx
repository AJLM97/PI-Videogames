import React from "react";
import { useHistory } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
    const history = useHistory();
    return (
        <div className={style.container} >
            <div className={style.start}>
                <h1><span>★</span> PI-Videogames</h1>
                <button onClick={() => history.push('/home')}>Press Start</button>
            </div>
            <div className={style.author}>
                Alejandro Javier Ledesma Miño
            </div>
        </div>
    );
}

export default Landing;