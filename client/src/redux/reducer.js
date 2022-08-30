import { GET_ALL_GAMES, GET_GAME_DETAILS, CREATE_GAME, GET_ALL_GENRES } from './actions.js';

const initialState = {
    games: [],
    gameDetail: {},
    genres: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Acá va tu código:
        case GET_ALL_GAMES:
            return {...state, games: action.payload}
        case GET_GAME_DETAILS:
            return {...state, gameDetail: {...action.payload}}
        case CREATE_GAME:
            return {...state, games: [...state.games, action.payload]}
        case GET_ALL_GENRES:
            return {...state, genres: action.payload}
        default:
            return state
    }
};

export default rootReducer;