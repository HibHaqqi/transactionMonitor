const express = require("express");
const bodyParser = require('body-parser');
const router = require("./routers/router");
const morgan = require("morgan");
const app = express();
const path = require("path");
const cors = require('cors');

// dotENV
require("dotenv").config();
const port = process.env.PORT;

// CookieParser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(router);




app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

