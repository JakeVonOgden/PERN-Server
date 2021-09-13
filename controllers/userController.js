const router = require("express").Router(); 
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

/*
======================
   Register Account
======================
*/

router.post("/register", body("email").isEmail(), (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: "must be a valid email -> [EXAMPLE]: anything@anything.anything",
            errors: errors.array() 
        });
    };
 
    const {firstName, lastName, email, password} = req.body;
    
    try {
        const User = UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        });

        const token = jwt.sign({
            id: User.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
        );

        res.status(201).json({
            message: "Registration Succesful!",
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: bcrypt.hashSync(password, 10),
                sessionToken: token
            },
        });

    } catch (e) {
        if (e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email or password already in use.",
                error: e
            });
       
        } else {
            res.status(500).json({
                message: "Unable to register user.",
                error: e
            });
        }
    }
});

/*
======================
        Login
======================
*/

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    user: loginUser,
                    message: "Login Succesful!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    
    } catch (e) {
        res.status(500).json({
            message: "Login Failed"
        })
    }
});

module.exports = router;