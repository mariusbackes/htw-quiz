const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User routes
let user_routes = require('./api/routes/UserRoutes');
user_routes(app);

// Game routes
let game_routes = require('./api/routes/GameRoutes');
game_routes(app);

// Highscore routes
let highscore_routes = require('./api/routes/HighscoreRoutes');
highscore_routes(app);

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`)
})
