const mongoose = require("mongoose");


const setDataSchema = new mongoose.Schema({
    officeUnit: {
        id: {type: Number},
        name: {type: String},
        date: {type: Date},
    },
    typesOfClaim:{
        id: {type: Number},
        name: {type: String},
        date: {type: Date}
    }
});

module.exports = SetDataSchema = mongoose.model("setDataSchema", setDataSchema);