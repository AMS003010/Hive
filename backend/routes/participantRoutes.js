const express = require('express');

const {
    addParticipant,
    deleteParticipant,
    updateParticipant,
    getAllParticipants,
} =  require('../controllers/participantControllers');

const router = express.Router();

router.get("/",getAllParticipants);
router.post("/",addParticipant);
router.delete("/:id", deleteParticipant);
router.patch("/:id", updateParticipant);

module.exports = router;