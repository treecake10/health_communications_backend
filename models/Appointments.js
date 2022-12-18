const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appointmentsSchema = new Schema({

    userID: {
        type: String
    },

    doctorID: {
        type: String
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    date: {
        type: String
    },

    time: {
        type: String
    },

    type: {
        type: String
    },

    status: {
        type: String
    }

});

module.exports = appointmentsSchema =  mongoose.model("Appointments", appointmentsSchema);