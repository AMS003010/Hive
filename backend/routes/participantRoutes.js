const express = require('express');

const {
    getAllParticipant,
    addParticipant
} =  require('../controllers/participantControllers');

const router = express.Router();

router.get("/",getAllParticipant);
router.post("/",addParticipant);

module.exports = router;