const loginRoute = require("./auth.route")
const userRoute = require("./user.route")
const exsession = require('express-session')

module.exports = (app) => {
  app.use(exsession({
    secret: "loginsystem",
    resave: false,
    saveUninitialized: true
  }));

  app.use("/user", loginRoute);
  app.use("/user", userRoute)
};