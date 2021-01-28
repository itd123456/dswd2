const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require('../models/userModel');

router.post("/register", async (req, res) => {
    try{
    let {uId, password, passwordCheck, firstName, mName, lName, type} = req.body;

    //validate
    if(!uId || !password || !passwordCheck || !firstName || !mName|| !lName || !type === '')
        return res.status(400).json({mgs: "Not all fields have been entered"});
    if(password.length < 5)
        return res.status(400).json({msg: "The password needs to be atleast 5 characters long"});
    if(password !== passwordCheck)
        return res.status(400).json({msg: "Enter the same password twice for verification"});
    const existingUser = await User.findOne({uId: uId})
    if(existingUser)
        return res.status(400).json({msg: "An account with this uId already exist"});

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User ({
        uId, 
        password: passwordHash,
        firstName,
        mName,
        lName,
        type
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    conn.close();
    } catch(err){
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try{
        const {uId, password} = req.body;

        if(!uId || !password)
            return res.status(400).json({msg: "Not all fields have been entered"});

        const user = await User.findOne({uId: uId});

        if(!user)
            return res.status(400).json({msg: "No account with this ID has been registered"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg: "Invalid credentials"});   

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user.uId,
                firstName: user.firstName
            }
        })


    } catch(err){
        res.status(500).json({err: err.messsage});
    }
});

router.delete("/delete", auth, async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.user);
        res.json(deleteUser);
    }catch(err){
        res.status(500).json({err: err.messsage});
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try{    
        const token = req.header("x-auth-token");
        if(!token || token === "") 
            return res.status(400).json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) 
            return res.status(400).json(false);
        const user = await User.findById(verified.id);
        if(!user) return res.status(400).json(false);
        return res.json(true);

    }catch(err){
        res.status(400).json({err: err.messsage});
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user); 
    console.log(req.user);
});

module.exports = router;