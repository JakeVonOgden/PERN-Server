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

router.post("/", validateJWT, async (req,res) => {
    
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

router.get("/", async (req,res) => {
    try {
        const entries = await MerchandiseModel.findAll();
        res.status(200).json(entries);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
==============================
   Get Merchandise by User
==============================
*/

router.get("/mine", validateJWT, async (req, res) => {
    let { firstName, lastName } = req.user;
    try {
        const userMerchandise = await MerchandiseModel.findAll({
            where: {
                owner: firstName + " " + lastName
            }
        });
        res.status(200).json(userMerchandise);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

/*
==============================
   Get Merchandise by Owner
==============================
*/

router.get("/:owner", async (req, res) => {
    const { owner } = req.params;
    
    try {
        const results = await MerchandiseModel.findAll({
            where: { owner: owner }
        });
        res.status(200).json(results);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=========================
   Edit Merchandise
=========================
*/

router.put("/edit/:entryId", validateJWT, async (req, res) => {
    const { category, name, image, description, price, } = req.body;
    const merchandiseId = req.params.entryId;
    const ownerName = req.user.firstName + " " + req.user.lastName;

    const query = {
        where: {
            id: merchandiseId,
            owner: ownerName
        }
    };

    const editedMerchandise = {
        category: category,
        name: name,
        image: image,
        description: description,
        price: price
    };

    try {
        const edit = await MerchandiseModel.update(editedMerchandise, query);
        res.status(200).json({
            message: "Merchandise updated succesfully!",
            editedMerchandise,
            edit
        });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

/*
=========================
   Delete Merchandise
=========================
*/

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerName = req.user.firstName + " " + req.user.lastName;
    const merchandiseId = req.params.id;

    try {
        const query = {
            where: {
                id: merchandiseId,
                owner: ownerName
            }
        };

        await MerchandiseModel.destroy(query);
        res.status(200).json({ message: "Merchandise Removed" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;