const router = require("express").Router();
const setData = require("../../models/admin/setDataModel");


router.get("/encsetdata", async(req, res) =>{
    const getEnc = await setData.find();
    res.json(getEnc);
});

router.post("/setdata", async(req, res) =>{
    try{
        let{officeUnit, typesOfClaim, setType } = req.body;
        let nowDate = new Date();
        if(setType == 0)
            if(!officeUnit.id || !officeUnit.name)
                return res.status(400).json({msg:"All fields are required!"});
            const newSetDataType0 = new setData({
                officeUnit:{
                    id: officeUnit.id,
                    name: officeUnit.name,
                    date: nowDate
                }
                 
            });
            const savedSetDataType0 = await newSetDataType0.save();
            res.json(savedSetDataType0);
            conn.close();
            
        if(setType == 1)
            if(typesOfClaim.id || !typesOfClaim.name)
                return res.status(400).json({msg:"All fields are required"});
            const newSetDataType1 = new setData({
                officeUnit:{
                    id: officeUnit.id,
                    name: officeUnit.name,
                    date: nowDate
                }
            });
            const savedSetDataType1 = await newSetDataType1.save();
            res.json(savedSetDataType1);
            conn.close();

        
    }catch(err){
        return res.status(500).json(err);
    }
});



module.exports = router;