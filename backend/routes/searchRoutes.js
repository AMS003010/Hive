const express = require('express');

const {
    searchEvents,
    getAllEntities,
    getEventVolunteers,
    getEventParticpants,
    getEventOrganisers
} =  require('../controllers/searchController');

const router = express.Router();

router.get("/",getAllEntities);
router.post("/",searchEvents);
router.post("/volunteer",getEventVolunteers);
router.post("/organiser",getEventOrganisers);
router.post("/participant",getEventParticpants);

module.exports = router;