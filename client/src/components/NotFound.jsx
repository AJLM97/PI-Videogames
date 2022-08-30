import React from "react";
import Nav from "./Nav";
import style from "./NotFound.module.css";

const NotFound = () => {
    return (
        <>
            <Nav />
            <div className={style.container}>
                <h1>Page Not Found</h1>
            </div>
        </>
    );
}

export default NotFound;