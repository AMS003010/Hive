const express = require('express');

const {
    searchEvents
} =  require('../controllers/searchController');

const router = express.Router();

router.post("/",searchEvents);

module.exports = router;