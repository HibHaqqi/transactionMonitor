const express = require("express");
const router = require("./routers/router");
const morgan = require("morgan");
const app = express();
const port = 4000;
const path = require('path');



app.use(morgan('dev'));




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