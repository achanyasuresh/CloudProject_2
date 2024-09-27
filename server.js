const express = require('express');
const dbSetup = require('./src/helpers/database');
const cors = require('cors');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');

const corsOptions = {
    origin: "http://localhost:3000"
};

var db = null;

const createServer = async () => {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

    // routes
    require(`./src/routes/api`)(app);

    app.listen(port, () => {
        dbSetup.initialSetup();
        db = dbSetup.db;
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    createServer,
    db
};
