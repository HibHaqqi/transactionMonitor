const express = require("express");
const api = require("./api/api");
const router = express.Router();

router.use('/api', api);


router.use('/', (req, res) => {
    
});

module.exports = router;