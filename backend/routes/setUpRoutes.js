const express = require('express');

const {createTables} =  require('../controllers/setUpControllers');

const router = express.Router();

router.post("/",createTables);

module.exports = router;