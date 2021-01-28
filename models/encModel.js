const mongoose = require("mongoose");

const encSchema = new mongoose.Schema({
    uId: {type: String, required: true},
    cTrishNo: {type: String, required: true},
    payee: {type: String, required: true},
    particulars: {type: String, required: true},
    oOu: {type: Number, required: true },
    typesOfClaim: {type: Number, required: true},
    grossAmount: {type: Number, required: true}
});

module.exports = EncModel = mongoose.model("enc", encSchema);
