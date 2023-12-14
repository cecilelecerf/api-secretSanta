const mongoose = require("mongoose")
const Schema = mongoose.Schema;
let userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Number,
        required: true,
    },
    emailSend:{
        type: [Number],
    },
    users_id:{
        type : [Number]
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User", userSchema)