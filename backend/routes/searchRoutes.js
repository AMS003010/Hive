const express = require('express');

const {
    searchEvents,
    getAllEntities
} =  require('../controllers/searchController');

const router = express.Router();

router.get("/",getAllEntities);
router.post("/",searchEvents);

module.exports = router;