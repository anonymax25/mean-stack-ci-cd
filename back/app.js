require('dotenv').config();
const Express = require("express");
const Mongoose = require("mongoose");
const helmet = require('helmet');
const BodyParser = require("body-parser");
const cors = require('cors');
const routes = require('./routes');

const app = Express();

async function startServer() {
    try {

        app.use(cors());
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({extended: false}));
        app.use(function (req, res, next) {

            res.setHeader('x-Trigger', 'CORS');
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', '*');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', false);

            // Pass to next layer of middleware
            next();
        });
        await routes(app);

        console.log('Connecting to DB... : ', process.env.MONGO_URL !== undefined ? process.env.MONGO_URL : "mongodb://127.0.0.1:27017/todo");
        
        Mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todo', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Connected to DB');
                app.listen(8181, () => {
                    console.log("Listening at :8181...");
                    app.emit("started");
                });
            }
        })

    } catch (e) {
        console.error(`Error in server : ${e.toString()}`);
        console.log(e)
    }
}

startServer();

module.exports = app;

