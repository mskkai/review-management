const express = require("express");
require("./db/mongoose");
const employeeRouter = require("./routers/employee");
const reviewsRouter = require("./routers/reviews");
const bodyParser = require("body-parser");

// Initialize express
const app = express();
app.use(bodyParser.json()); // To support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // To support URL-encoded bodies
    extended: true,
  })
);

//use router
app.use(employeeRouter);
app.use(reviewsRouter);

module.exports = app;
