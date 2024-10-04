const express = require('express');
const { getDb, initialSetup } = require('./src/helpers/database');
const cors = require('cors');
const {utilConstants} = require('./src/helpers/constants');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
const req = require('express/lib/request');

const corsOptions = {
    origin: "*",
};

var db = null;

const createServer = async () => {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

    // routes
    require(`./src/routes/api`)(app);

    app.listen(port, () => {

        // initialSetup()
        //     .then(() =>
        //         console.log("the db initial: " + JSON.stringify(getDb()))
        //     )
        //     .then(() => {
        //         db = getDb();
        //     });
        console.log(`App listening at http://localhost:${port}`)
    })
};

module.exports = {
    createServer,
    db
};
