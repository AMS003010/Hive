const express = require('express');

const {
    getAllVolunteers,
    addVolunteer
} =  require('../controllers/volunteerControllers');

const router = express.Router();

router.get("/",getAllVolunteers);
router.post("/",addVolunteer);

module.exports = router;