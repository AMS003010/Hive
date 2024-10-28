const express = require('express');

const {
    getAllVolunteers,
    addVolunteer,
    deleteVolunteer,
    updateVolunteer,
} =  require('../controllers/volunteerControllers');

const router = express.Router();

router.get("/",getAllVolunteers);
router.post("/",addVolunteer);
router.delete("/:id", deleteVolunteer);
router.patch("/:id", updateVolunteer);

module.exports = router;