const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({

    userUID: {
        type: mongoose.Schema.Types.ObjectId
    },

    firstName: {
        type: String
    },

    middleName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String  
    },

    password: {
        type: String
    },

    pcpDoc: {
        type: String
    },

    approvedDocFamilies: {
        type: [String]
    }

});

module.exports = userSchema =  mongoose.model("User", userSchema);