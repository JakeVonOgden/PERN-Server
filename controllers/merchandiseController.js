const router = require("express").Router();
const validateJWT = require("../middleware/validate-jwt");
const { MerchandiseModel } = require('../models');

router.get("/test", validateJWT, (req, res) => {
    res.send("hey! this is the test route!")
});



module.exports = router;