const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let doctorSchema = new Schema({

    docUID: {
        type: mongoose.Schema.Types.ObjectId
    },

    fullname: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String 
    },

    fieldOfStudy: {
        type: String
    }

});

module.exports = doctorSchema =  mongoose.model("Doctor", doctorSchema);