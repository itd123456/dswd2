const router = require("express").Router();
const encModel = require("../models/encModel");


router.get("/", async(req, res) =>{
    const enc = await encModel.find();
    res.json(enc);
});

router.post("/encadd", async(req, res) =>{
    try {
        let{uId, cTrishNo, payee, particulars, oOu, typesOfClaim, grossAmount} = req.body;
    
        if(!uId || !cTrishNo || !payee || !particulars || !oOu || !typesOfClaim || !grossAmount === "")
            return res.status(400).json({msg: "All fields are required!"});
        const newEncModel = new encModel({
            uId, 
            cTrishNo, 
            payee, 
            particulars,
            oOu, 
            typesOfClaim, 
            grossAmount
        });

        const savedEnc = await newEncModel.save();
        res.json(savedEnc);

    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;