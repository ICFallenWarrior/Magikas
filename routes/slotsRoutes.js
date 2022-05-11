var express = require('express');
var router = express.Router();
var cModel = require("../models/slotsModel");

            
router.get('/', async function(req, res, next) {
    console.log("Get all slots")
    let result = await cModel.getAllSlots();
    res.status(result.status).send(result.result);
});

module.exports = router;