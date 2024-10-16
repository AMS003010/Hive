const express = require('express');

const {
    getAllEvent,
    addEvent
} =  require('../controllers/eventControllers');

const router = express.Router();

router.get("/",getAllEvent);
router.post("/",addEvent);

module.exports = router;