//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const { YOUR_API_KEY } = process.env;
const axios = require('axios');

// Syncing all the models at once.
async function loadGenres() {
  const videogamesApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`).then((response) => {
    return response.data.results.map((game) => {
        return {
            'id': game.id,
            'name': game.name
        };
    });
  });
  Genre.bulkCreate(videogamesApi);
};

conn.sync({ force: true }).then(async() => {
  await loadGenres();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
