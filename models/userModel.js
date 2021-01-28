const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uId: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    firstName: {type: String, required: true},
    mName: {type: String, required: true},
    lName: {type: String, required: true},
    type: {type: Number, required: true}
});

module.exports = User = mongoose.model("user", userSchema);