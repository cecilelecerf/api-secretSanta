const jwtMiddleware = require("../middlwares/jwtMiddlware")
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - _id
 *       properties:
 *         _id:
 *             type: string
 *             description: User Id (unique)
 *         email:
 *           type: string
 *           format: email
 *           description: User email address (unique)
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           nullable: true
 *         createdAt:
 *           type: Data
 *           description : Creation date
 *     TokenResponse:
 *         type: object
 *         properties:
 *             token:
 *                 type: string
 */

module.exports = (app) => {
    const userController = require("../controllers/userController")
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /users/register:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      format: email
 *                      description: User email adress (unique)
 *                  password:
 *                      type: string
 *                      format: password
 *                      description: User password
 *              required:
 *                  - email
 *                  - password
 *     responses:
 *       201:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */
    app.route("/users/register")
        .post(userController.userRegister);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      format: email
 *                      description: User email adress (unique)
 *                  password:
 *                      type: string
 *                      format: password
 *                      description: User password
 *              required:
 *                  - email
 *                  - password
 *     responses:
 *       201:
 *         description: Login of a user.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Email or password incorrect
 *         content:
 *           application/json:
 *             example:
 *               message: "Email or password incorrect"
 *             
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */
    app.route("/users/login")
        .post(userController.userLogin);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */
    app.route("/users")
        .get(userController.listenAllUsers);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Viewing a user
 *     tags: [Users]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: string
 *           description: User ID to retrieve
 *     responses:
 *       200:
 *         description: Viewing a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *          description: Access prohibited missing token | Access prohibited invalid token
 *          content:
 *              application/json:
 *                  examples:
 *                      missing token:
 *                          value:
 *                              message: "Access prohibited missing token"
 *                      invalid token:
 *                          value:
 *                              message: "Access prohibited invalid token"
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */   
    app.route("/users/:user_id")
        .get(jwtMiddleware.verifyTokenUser, userController.listenSingleUser);


/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: Modify a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      format: email
 *                      description: User email adress (unique)
 *                  password:
 *                      type: string
 *                      format: password
 *                      description: User password
 *              required:
 *                  - email
 *                  - password
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: string
 *           description: User ID to retrieve
 *     responses:
 *       200:
 *         description: Modify a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *          description: Access prohibited missing token | Access prohibited invalid token
 *          content:
 *              application/json:
 *                  examples:
 *                      missing token:
 *                          value:
 *                              message: "Access prohibited missing token"
 *                      invalid token:
 *                          value:
 *                              message: "Access prohibited invalid token"
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */
    app.route("/users/{user_id}")
        .put(jwtMiddleware.verifyTokenUser, userController.updateUser);   

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: Delete
 *     tags: [Users]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: string
 *           description: User ID to retrieve
 *     responses:
 *       204:
 *         description: Delete a user
 *       403:
 *          description: Access prohibited missing token | Access prohibited invalid token
 *          content:
 *              application/json:
 *                  examples:
 *                      missing token:
 *                          value:
 *                              message: "Access prohibited missing token"
 *                      invalid token:
 *                          value:
 *                              message: "Access prohibited invalid token"
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */ 


app.route("/users/:user_id")
    .delete(jwtMiddleware.verifyTokenUser, userController.deleteUser);

}