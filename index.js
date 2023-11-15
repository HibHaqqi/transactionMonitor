const express = require("express");
const router = require("./routers/router");
const morgan = require("morgan");
const app = express();
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// dotENV
require("dotenv").config();
const port = process.env.PORT;

// CookieParser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(router);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
  },
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  //apis: ["./routes/*.js"],
  apis:["index.js"]
};

const swaggerSpec = swaggerJSDoc(options);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
