const express = require('express')
const path = require('path')
const hbs = require('hbs')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const db = require("./models");
require("dotenv").config();
const routeHandler = require("./src/routes/index");
const app = express()
const exsession = require('express-session')


//URL ENCODE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())


routeHandler(app);

const port = process.env.PORT || 3000//PORT(localhost:5000)
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  })


//listen to app and log port to console
app.listen(port, () =>
   console.log("listening to port " + port)
)