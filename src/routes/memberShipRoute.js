
/**
 * @swagger
 * components:
 *   schemas:
 * 
 *     Membership:
 *       type: object
 *       required:
 *         - group_id
 *         - user_id
 *       properties:
 *         group_id:
 *           type: string
 *           description: Group Id
 *         user_id:
 *           type: string
 *           description: User Id
 *         accept:
 *           type: boolean
 *           description: Did the user accept the invitation?
 *           nullable: true
 *         user_offer:
 *           type: string
 *           description: id of the user to whom to give the gift
 *           nullable: true
 *         createdAt:
 *           type: Data
 *           description : Date of created
 * 
 *     ResponseObject:
 *       type: object
 *       properties:
 *          membership:
 *              $ref: '#/components/schemas/Membership'
 *          token:
 *              type: string
 */
const jwtMiddleware = require("../middlwares/jwtMiddlware")
module.exports = (app) => {
    const groupController = require("../controllers/groupController")
    const memberController = require("../controllers/memberShipController")


/**
 * @swagger
 * /group/invite/{group_id}/{user_id}:
 *   post:
 *     summary: Inviting a user
 *     tags: [Groups]
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *         - in: path
 *           name: user_id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID de l'utilisateur à récupérer
 *         - in: path
 *           name: group_id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID du groupe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                   email:
 *                       type: string
 *                       format: email
 *                       description: Email of user (unique)
 *     responses:
 *       201:
 *         description: Inviting a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseObject'
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
app.route("/group/invite/:group_id/:user_id")
.post(jwtMiddleware.verifyTokenUser, memberController.inviteUser);

/**
* @swagger
* /group/accept/{group_id}/{user_id}:
*   post:
*     summary: User accept invite
*     tags: [Groups]
*     security:
*         - BearerAuth: []
*     parameters:
*         - in: path
*           name: user_id
*           required: true
*           schema:
*             type: string
*           description: ID de l'utilisateur à récupérer
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: ID du groupe
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*               type: object
*               properties:
*                   accept:
*                       type: boolean
*                       format: boolean
*                       description: User accept or not invitation
*     responses:
*       201:
*         description: User accept invite
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Membership'
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
app.route("/group/accept/:group_id/:user_id")
.post(jwtMiddleware.verifyTokenGroup, memberController.acceptGroup);

/**
* @swagger
* /group/draw/{group_id}/{user_id}:
*   get:
*     summary: Secret Santa draw for a given group
*     tags: [Groups]
*     security:
*         - BearerAuth: []
*     parameters:
*         - in: path
*           name: user_id
*           required: true
*           schema:
*             type: string
// TODO: fr
*           description: ID de l'utilisateur à récupérer
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: ID du groupe
*     responses:
*       200:
*         description: Secret Santa draw for a given group
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
app.route("/group/draw/:group_id/:user_id")
.get(jwtMiddleware.verifyTokenUser, memberController.draw);

/**
* @swagger
* /groups/members/{group_id}:
*   get:
*     summary: List of all invitations sent in a Group
*     tags: [Groups]
*     security:
*         - BearerAuth: []
*     parameters:
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: Id of group
*     responses:
*       200:
*         description: List of all invitations sent in a Group
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
app.route("/groups/members/:group_id")
// TODO : controller

/**
* @swagger
* /groups/members/{group_id}:
*   security:
*      - BearerAuth: []
*   get:
*     summary: List of all invitations sent in a group and which have been accepted
*     tags: [Groups]
*     parameters:
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: Id of group
*     responses:
*       200:
*         description: List of all invitations sent in a group and which have been accepted
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
app.route("/groups/members/accept/:group_id")
.get(memberController.listenAllMembersOfGroupAndAccept)

// TODO : route tous les groupes d'un u

}