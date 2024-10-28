const express = require('express');

const {
    getAllOrganisers,
    addOrganiser,
    deleteOrganiser,
    updateOrganiser
} =  require('../controllers/organiserControllers');

const router = express.Router();

router.get("/",getAllOrganisers);
router.post("/",addOrganiser);
router.delete("/:id", deleteOrganiser);
router.patch("/:id", updateOrganiser);

module.exports = router;