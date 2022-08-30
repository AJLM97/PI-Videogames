import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getGameDetail } from "../redux/actions";
import { useParams } from 'react-router-dom';
import Nav from "./Nav";
import style from "./GameDetail.module.css";
import Img from '../assets/none.png'

const GameDetail = () => {
    const { id } = useParams();
    const details = useSelector((state) => state.gameDetail);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGameDetail(id));
    }, [dispatch, id]);
    return (
        <>
            <Nav />
            <div className={style.container}>
                {details.name ? (<>
                    <h1>{details.name}</h1>
                    <img src={details.image ? details.image : Img} alt={details.name} />
                    <div>
                        <label>Released Date:</label>
                        <div>
                            <span key={details.released}>{details.released}</span>
                        </div>
                    </div>
                    <div>
                        <label>Rating:</label>
                        <div>
                            <span key={details.rating}>{`★ ${details.rating}`}</span>
                        </div>
                    </div>
                    <div>
                        <label>Genre/s:</label>
                        <div>
                            {details.genres?.map(genre => <span key={genre.id + genre.name}>{genre.name}</span>)}
                        </div>
                    </div>
                    <div>
                        <label>Platform/s:</label>
                        <div>
                            {details.platforms?.map(p => <span key={p}>{p}</span>)}
                        </div>
                    </div>
                    <div className={style.description}>
                        {details.description}
                    </div>
                </>) : <h1>Game Not Found</h1>}
            </div>
        </>
    );
}

export default GameDetail;