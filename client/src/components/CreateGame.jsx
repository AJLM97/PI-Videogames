import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createGame, getAllGenres } from "../redux/actions";
import { useHistory } from "react-router-dom";
import style from "./CreateGame.module.css";

const CreateGame = () => {
    const genres = useSelector((state) => state.genres);
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        description: '',
        image: '',
        released: '',
        rating: 0,
        platforms: [],
        platformsButtons: {},
        genres: [],
        genresButtons: {}
    });
    useEffect(() => {
        dispatch(getAllGenres());
    }, [dispatch]);
    const platforms = ["PC", "Linux", "macOS", "iOS", "Android", "Xbox 360", "Xbox One", "Xbox Series S/X", "PS Vita", "PSP", "PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Nintendo 64", "Nintendo DS", "Nintendo 3DS", "Nintendo Switch", "Game Boy", "Game Boy Color", "Game Boy Advance", "Wii", "Wii U"];
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validation({
                ...input,
                [e.target.name]: e.target.value,
            }, e.target.name)
        );
    }
    const selectGenre = (id) => {
        setInput({
            ...input,
            genres: input.genresButtons[id] ? input.genres.filter(g => g !== id) : [...input.genres, id],
            genresButtons: { ...input.genresButtons, [id]: !input.genresButtons[id] }
        })
        setErrors(
            validation({
                ...input,
                genres: input.genresButtons[id] ? input.genres.filter(g => g !== id) : [...input.genres, id],
            }, "genres")
        );
    }
    const selectPlatform = (id) => {
        setInput({
            ...input,
            platforms: input.platformsButtons[id] ? input.platforms.filter(g => g !== id) : [...input.platforms, id],
            platformsButtons: { ...input.platformsButtons, [id]: !input.platformsButtons[id] }
        })
        setErrors(
            validation({
                ...input,
                platforms: input.platformsButtons[id] ? input.platforms.filter(g => g !== id) : [...input.platforms, id],
            }, "platforms")
        );
    }
    const validation = (actual, type) => {
        let aux = {};
        if (type === "name" || type === "submit") {
            if (!actual.name) aux.name = "★ Name is required";
            else aux.name = "";
        }
        if (type === "image" || type === "submit") {
            if (actual.image && !actual.image.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)) aux.image = "★ The link provided is not an image";
            else aux.image = "";
        }
        if (type === "released" || type === "submit") {
            if (!actual.released) aux.released = "★ Release Date is required";
            else aux.released = "";
        }
        if (type === "rating" || type === "submit") {
            if (!actual.rating) aux.rating = "★ Rating is required";
            else aux.rating = "";
        }
        if (type === "rating" || type === "submit") {
            if (actual.rating < 0 || actual.rating > 5) aux.rating = "★ Rating must be between 0 and 5";
            else aux.rating = "";
        }
        if (type === "genres" || type === "submit") {
            if (actual.genres.length === 0) aux.genres = "★ Pick at least one genre";
            else aux.genres = "";
        }
        if (type === "platforms" || type === "submit") {
            if (actual.platforms.length === 0) aux.platforms = "★ Pick at least one platform";
            else aux.platforms = "";
        }
        if (type === "description" || type === "submit") {
            if (!actual.description) aux.description = "★ Description is required";
            else aux.description = "";
        }
        return { ...errors, ...aux };
    }
    const handleSubmit = () => {
        const aux = validation(input, "submit");
        setErrors(aux);
        if (!aux.name && !aux.image && !aux.released && !aux.rating && !aux.genres && !aux.platforms && !aux.description) {
            dispatch(createGame({
                "name": input.name,
                "description": input.description,
                "released": input.released,
                "rating": input.rating,
                "platforms": input.platforms.join(),
                "genres": input.genres,
                "image": input.image
            }));
            alert("Videogame created successfully!");
            history.push('/home');
        } else {
            alert("Please complete the fields correctly");
        }
    }
    return (
        <div className={style.container} >
            <h1>Create Game</h1>
            <div>
                <label>Name:</label>
                <div>
                    <input name="name" type="text" value={input.name} placeholder="Game Name..." onChange={(e) => handleChange(e)} />
                    {errors.name && <span>{errors.name}</span>}
                </div>
            </div>
            <div>
                <label>Image:</label>
                <div>
                    <input name="image" type="text" value={input.image} placeholder="Image URL..." onChange={(e) => handleChange(e)} />
                    {errors.image && <span>{errors.image}</span>}
                </div>
            </div>
            <div>
                <label>Released Date:</label>
                <div>
                    <input name="released" type="date" value={input.released} onChange={(e) => handleChange(e)} />
                    {errors.released && <span>{errors.released}</span>}
                </div>
            </div>
            <div>
                <label>Rating:</label>
                <div>
                    <input name="rating" type="number" value={input.rating} placeholder="Rating 0-5..." min="0" max="5" onChange={(e) => handleChange(e)} />
                    {errors.rating && <span>{errors.rating}</span>}
                </div>
            </div>
            <div>
                <label>Genre/s:</label>
                <div>
                    {
                        genres?.map(genre => <button className={input.genresButtons[genre.id] ? style.active : ''} onClick={() => selectGenre(genre.id)} key={genre.id + genre.name}>{genre.name}</button>)
                    }
                    {errors.genres && <span>{errors.genres}</span>}
                </div>
            </div>
            <div>
                <label>Platform/s:</label>
                <div>
                    {
                        platforms?.map(platform => <button className={input.platformsButtons[platform] ? style.active : ''} onClick={() => selectPlatform(platform)} key={platform}>{platform}</button>)
                    }
                    {errors.platforms && <span>{errors.platforms}</span>}
                </div>
            </div>
            <div>
                <label>Description:</label>
                <div>
                    <textarea name="description" cols="50" rows="10" value={input.description} placeholder="Description..." onChange={(e) => handleChange(e)} />
                    {errors.description && <span>{errors.description}</span>}
                </div>
            </div>
            <button className={style.button} onClick={handleSubmit}> CREATE GAME </button>
        </div >
    );
}

export default CreateGame;