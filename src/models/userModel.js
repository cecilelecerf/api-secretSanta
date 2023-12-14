const mongoose = require("mongoose")
const Schema = mongoose.Schema;
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse e-mail de l'utilisateur (unique)
 *         password:
 *           type: string
 *           description: Mot de passe de l'utilisateur
 */
let userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("User", userSchema)