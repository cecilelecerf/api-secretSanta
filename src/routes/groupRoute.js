
/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - name
 *         - admin
 *       properties:
 *         name:
 *           type: string
 *           description: Group name (unique)
 *         admin:
 *           type: string
 *           description: Id of the admin who is a user
 *         createdAt:
 *           type: Data
 *           description : Date of created
 */
const jwtMiddleware = require("../middlwares/jwtMiddlware")
module.exports = (app) => {
    const groupController = require("../controllers/groupController")
    const memberController = require("../controllers/memberShipController")

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: The Groups CRUD
 * /groups:
 *   post:
 *     summary: Create a new Group
 *     tags: [Groups]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                   name:
 *                       type: string
 *                       description: Name of the group (unique)
 *                   admin:
 *                       type: string
 *                       description: Id of the admin who is a user
 *     responses:
 *       201:
 *         description: The created Group.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
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
    app.route("/groups")
        .post(jwtMiddleware.verifyTokenUser, groupController.createGroup);

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: List all of Group
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: The list Group.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Group'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Error server."
 *
 */
    app.route("/groups")
        .get(groupController.listenAllGroups);

/**
 * @swagger
 * /group/{group_id}:
 *   get:
 *     summary: One Group
 *     tags: [Groups]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: group_id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID du groupe
 *     responses:
 *       200:
 *         description: One Group.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
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
    app.route("/group/:group_id")
        .get(jwtMiddleware.verifyTokenUser, groupController.oneGroup);


/**
 * @swagger
 * /group/delete/{group_id}:
 *   post:
 *     summary: Delete a Group
 *     tags: [Groups]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                   user_id:
 *                       type: string
 *                       description: Id of the user (unique)
 *     responses:
 *       204:
 *         description: The group has been deleted.
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
app.route("group/delete/:group_id")
    .put(jwtMiddleware.verifyTokenUser, groupController.deleteGroup)

/**
 * @swagger
 * /group/update/{group_id}:
 *   put:
 *     summary: Update a Group
 *     tags: [Groups]
 *     security:
 *         - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                   name:
 *                       type: string
 *                       description: Name of the group (unique)
 *                   admin:
 *                       type: string
 *                       description: Id of the admin
 *                   user_id:
 *                       type: string
 *                       description: Id of this user
 *     responses:
 *       200:
 *         description: The group has been updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
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
app.route("group/update/:group_id")
    .post(jwtMiddleware.verifyTokenUser, groupController.updateGroup)

}