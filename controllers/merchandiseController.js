const router = require("express").Router();
const validateJWT = require("../middleware/validate-jwt");
const { MerchandiseModel } = require('../models');

router.get("/test", validateJWT, (req, res) => {
    res.send("hey! this is the test route!")
});

/*
=========================
   Merchandise Create
=========================
*/

router.post('/', validateJWT, async (req,res) => {
    
    const { category, name, image, description, price, } = req.body;
    const { firstName, lastName } = req.user;

    const entry = {
        category,
        name,
        image,
        description,
        price,
        owner: firstName + " " + lastName
    }
    
    try {
        const newEntry = await MerchandiseModel.create(entry);
        res.status(200).json({
            message: "Merchandise added",
            newEntry
        });
    
    } catch (e) {
        res.status(500).json({ 
            message: "Failed to add Merchandise",
            error: e
        });
    }

});

/*
=========================
   Get all Merchandise
=========================
*/

router.get('/', async (req,res) => {

});

/*
==============================
   Get Merchandise by Owner
==============================
*/

router.get("/:owner", async (req, res) => {

});

/*
=========================
   Edit Merchandise
=========================
*/

router.put("/update/:owner", validateJWT, async (req, res) => {

});

/*
=========================
   Delete Merchandise
=========================
*/

router.delete("/delete/:owner", validateJWT, async (req, res) => {

});

module.exports = router;