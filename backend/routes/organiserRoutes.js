const express = require('express');

const {
    getAllOrganisers,
    addOrganiser
} =  require('../controllers/organiserControllers');

const router = express.Router();

router.get("/",getAllOrganisers);
router.post("/",addOrganiser);

module.exports = router;