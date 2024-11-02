const express = require('express');

const {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent,
    getEvent,
    getTotalBudgetOfAllClubs
} =  require('../controllers/eventControllers');


const router = express.Router();

router.get("/",getAllEvents);
router.get("/budget",getTotalBudgetOfAllClubs);
router.post("/",addEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);
router.get("/:id",getEvent);

module.exports = router;