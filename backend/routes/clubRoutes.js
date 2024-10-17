const express = require('express');

const {
    getAllClubs,
    addClub
} =  require('../controllers/clubControllers');

const router = express.Router();

router.get("/",getAllClubs);
router.post("/",addClub);

module.exports = router;