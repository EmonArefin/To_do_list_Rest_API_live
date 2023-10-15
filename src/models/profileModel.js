const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    mobile: {type: Number},
    city: {type: String},
    userName: {type: String},
    password: {type: String}
}, {versionKey: false,  timestamps:true});

const profileModel = mongoose.model("profiles", dataSchema);

module.exports = profileModel;