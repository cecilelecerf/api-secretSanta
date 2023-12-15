const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let groupSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: String,
        required: true,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Group", groupSchema)