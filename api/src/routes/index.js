require('dotenv').config();
const { Router } = require('express');
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
const { Videogame, Genre, Op } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    try {
        const videogamesDB = []
        if(name) await Videogame.findAll({ where: { name: { [Op.like]: `%${name}%` } }, include: [{ model: Genre }] }).then(response => {
            for(const game of response) {
                if(name && videogamesDB.length === 15) break;
                videogamesDB.push(game);
            }
        });
        else await Videogame.findAll({ include: [{ model: Genre }] }).then(response => {
            response.forEach(game => {
                videogamesDB.push(game);
            });
        });
        const videogamesApi = []
        const promisesApi = [];
        if(name) promisesApi.push(axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&search=${name}`));
        else {
            for (let i = 1; i <= 5; i++) {
                promisesApi.push(axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`));
            }
        }
        await Promise.all(promisesApi).then((pages) => {
            pages.forEach(page => {
                for(const game of page.data.results) {
                    if(name && videogamesApi.length + videogamesDB.length === 15) break;
                    videogamesApi.push({
                        'id': game.id,
                        'name': game.name,
                        'released': game.released,
                        'rating': game.rating,
                        'platforms': game.platforms.map((platform) => platform.platform.name),
                        'genres': game.genres.map((genre) => {
                            return { 
                                'id': genre.id,
                                'name': genre.name
                            };
                        }),
                        'image': game.background_image
                    });
                }
            });
        });
        return res.status(200).json([...videogamesApi, ...videogamesDB]);
    } catch(error) {
        console.log(error);
    }
});

router.post('/videogames', async (req, res) => {
    const {name, description, released, rating, platforms, image, genres} = req.body;
    if(!name || !description || !platforms) {
        res.status(400).json({msg: 'Faltan datos importantes'});
    }
    try {
        const videogamesDB = await Videogame.create({name, description, released, rating, platforms, image});
        videogamesDB.addGenres(genres);
        return res.json(videogamesDB);
    } catch(error) {
        console.log(error);
    }
});

router.get('/videogames/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
    try {
        if(!isNaN(idVideogame)) {
            const videogamesApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`).then((response) => {
                return {
                    'id': response.data.id,
                    'name': response.data.name,
                    'description': response.data.description_raw,
                    'released': response.data.released,
                    'rating': response.data.rating,
                    'platforms': response.data.platforms.map((platform) => platform.platform.name),
                    'genres': response.data.genres.map((genre) => {
                        return {
                            'id': genre.id,
                            'name': genre.name
                        };
                    }),
                    'image': response.data.background_image
                };
            });
            return res.json(videogamesApi);
        } else {
            const videogameDB = await Videogame.findByPk(idVideogame, { include: [{ model: Genre }] });
            return res.json(videogameDB);
        }
    } catch(error) {
        console.log(error);
    }
});

router.get('/genres', async (req, res) => {
    try {
        const videogamesDB = await Genre.findAll();
        return res.json(videogamesDB);
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;
