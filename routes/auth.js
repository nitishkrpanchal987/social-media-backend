const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user')

// registration
router.post("/register", async (req, res)=>{
    try {
        //gen new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and gen res
        const user = await newUser.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

//login
router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).send("invalid credentials");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).send("invalid credential");

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports = router;