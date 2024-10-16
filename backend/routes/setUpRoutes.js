const express = require('express');

const {createTables} =  require('../controllers/setUpControllers');

const router = express.Router();

router.get("/",createTables);

module.exports = router;