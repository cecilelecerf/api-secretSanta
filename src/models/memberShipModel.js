const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let memberSchema = new Schema ({
    group_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    accept:{
        type: Boolean,
    },
    user_offer:{
        type: String,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Member", memberSchema)