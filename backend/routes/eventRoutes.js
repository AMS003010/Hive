const express = require('express');

const {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent
} =  require('../controllers/eventControllers');


const router = express.Router();

router.get("/",getAllEvents);
router.post("/",addEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

module.exports = router;