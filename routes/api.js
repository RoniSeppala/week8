const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("../models/User");

router.post("/user/register",async (req,res) => {
    try {
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(req.body.password, salt, async (err,hash) => {
                if(err) throw err;
                try {
                    await User.create(
                        {
                            email: req.body.email,
                            password: hash
                        }
                    )
                    res.send("ok").status(200)
                } catch (error) {
                    res.status(403).json({email: "Email already in use."})
                }
            })
        })
    } catch (error) {
        console.log("error")
    }
})

module.exports = router;