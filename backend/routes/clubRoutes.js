const express = require('express');

const {
    getAllClubs,
    addClub,
    deleteClub,
    updateClub
} =  require('../controllers/clubControllers');

const router = express.Router();

router.get("/",getAllClubs);
router.post("/",addClub);
router.delete("/:id", deleteClub);
router.patch("/:id", updateClub)

module.exports = router;