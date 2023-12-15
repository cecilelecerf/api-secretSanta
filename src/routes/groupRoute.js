
// const jwtMiddleware = require("../middlwares/jwtMiddlware")
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Group:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *       properties:
//  *         email:
//  *           type: string
//  *           format: email
//  *           description: Adresse e-mail de l'utilisateur (unique)
//  *         password:
//  *           type: string
//  *           description: Mot de passe de l'utilisateur
//  *         createdAt:
//  *           type: Data
//  *           description : Date de création
//  */

module.exports = (app) => {
    const groupController = require("../controllers/groupController")
    app.route("/groups")
        .get(groupController.listenAllGroups);
    app.route("/groups")
        .post(groupController.createGroup);
    app.route("/groups/:group_id")
        .get(groupController.oneGroup);
    app.route("/groups/invite/:group_id/:user_id")
        .post(groupController.inviteUser);
    app.route("/groups/acceot/:group_id/:user_id")
        .post(groupController.acceptGroup)


}