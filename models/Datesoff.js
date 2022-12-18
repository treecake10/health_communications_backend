const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let datesOffSchema = new Schema({

    docID: {
        type: String
    },

    date: {
        type: String
    },

    time: {
        type: [String]
    }

});

module.exports = datesOffSchema =  mongoose.model("Datesoff", datesOffSchema);