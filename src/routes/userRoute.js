const jwtMiddleware = require("../middlwares/jwtMiddlware")
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
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
    const userController = require("../controllers/userController")
    
    app.route("/users/register")
        .post(userController.userRegister);

    app.route("/users/login")
        .post(userController.userLogin);

    app.route("/users")
        .get(userController.listenAllUsers);

    app.route("/users/:user_id")
        .get(jwtMiddleware.verifyToken, userController.listenSingleUser);

    app.route("/users/:user_id")
        .put(jwtMiddleware.verifyToken, userController.updateUser);   

    app.route("/users/:user_id")
        .delete(jwtMiddleware.verifyToken, userController.deleteUser);

}