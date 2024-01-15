const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models/User");

router.post("/user/register",async (req,res) => {

    const existingUser = await User.findOne({email: req.body.email});

    if (existingUser) {
        console.log("usererror")
        return res.status(403).json({email: "Email is allready in use"});
    } else {
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(req.body.password, salt, (err,hash) => {
                if(err) throw err;
                User.create(
                    {
                        email: req.body.email,
                        password: hash
                    }
                )
            })
            res.send("ok").status(200)
        })
    }
})

module.exports = router;