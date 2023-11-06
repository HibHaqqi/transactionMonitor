const express = require("express");
const router = require("./routers/router");
const morgan = require("morgan");
const app = express();
const port = 3000;
const path = require('path');

const ejsLayouts = require('express-ejs-layouts');

app.use(morgan('dev'));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);

// Config folder layouts
app.set('layout', 'layouts/layouts');
app.set('layout extractScripts', true);

// Set public folder for libraary web
app.use(express.static('bower_components'));

// set public folrder
app.use(express.static('public'));

// built in Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});