const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User routes
let user_routes = require('./api/routes/UserRoutes');
user_routes(app);

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`)
})
