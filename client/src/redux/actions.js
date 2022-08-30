import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';
export const CREATE_GAME = 'CREATE_GAME';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const getAllGames = (nameGame = "") => {
    return async (dispatch) => {
        const videoGamesApi = await axios.get(`http://localhost:3001/videogames?name=${nameGame}`);
        dispatch({type: GET_ALL_GAMES, payload: videoGamesApi.data});
    };
};

export const getGameDetail = (idGame) => {
    return async (dispatch) => {
        const videoGamesApi = await axios.get(`http://localhost:3001/videogames/${idGame}`);
        dispatch({type: GET_GAME_DETAILS, payload: videoGamesApi.data});
    };
};

export const createGame = (detail) => {
    return async (dispatch) => {
        const videoGamesApi = await axios.post('http://localhost:3001/videogames', detail);
        dispatch({type: CREATE_GAME, payload: videoGamesApi.data});
    };
};

export const getAllGenres = () => {
    return async (dispatch) => {
        const videoGamesApi = await axios.get("http://localhost:3001/genres");
        dispatch({type: GET_ALL_GENRES, payload: videoGamesApi.data});
    };
};