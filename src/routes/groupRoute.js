
/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
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
 *         createdAt:
 *           type: Data
 *           description : Date de création
 */

const jwtMiddleware = require("../middlwares/jwtMiddlware")
module.exports = (app) => {
    const groupController = require("../controllers/groupController")
    const memberController = require("../controllers/memberShipController")
    app.route("/groups")
        .get(groupController.listenAllGroups);
    app.route("/groups")
        .post(jwtMiddleware.verifyTokenUser, groupController.createGroup);
    app.route("/group/:group_id")
        .get(jwtMiddleware.verifyTokenUser, groupController.oneGroup);
    app.route("/group/invite/:group_id/:user_id")
        .post(jwtMiddleware.verifyTokenUser, memberController.inviteUser);
    app.route("/group/accept/:group_id/:user_id")
        .post(jwtMiddleware.verifyTokenGroup, memberController.acceptGroup);
    app.route("/group/draw/:group_id/:user_id")
        .get(jwtMiddleware.verifyTokenUser, memberController.draw);
    app.route("/groups/members")
        .get(memberController.listenAllMembers)


}