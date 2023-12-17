
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
 *         - _id
 *       properties:
 *         _id:
 *             type: string
 *             description: User Id (unique)
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
 *           description : Creation date
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
 *           description: User ID to retrieve
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
*           description: User ID to retrieve
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: Group ID
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
*           description: User ID to retrieve
*         - in: path
*           name: group_id
*           required: true
*           schema:
*             type: string
*           description: Group ID
*     responses:
*       200:
*         description: Secret Santa draw for a given group
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                   $ref: '#/components/schemas/Membership'
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
*               type: array
*               items: 
*                   $ref: '#/components/schemas/Membership'
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
*       404:
*           description: Group not found
*           content:
*               application/json:
*                   example:
*                       message: "Group not found"                    
*       500:
*         description: Some server error
*         content:
*           application/json:
*             example:
*               message: "Error server."
*
*/   
app.route("/groups/members/:group_id")
    .get(jwtMiddleware.verifyTokenUser, memberController.listenAllMembersOfGroup)

/**
* @swagger
* /groups/members/accept/{group_id}:
*   get:
*     summary: List of all invitations sent in a group and which have been accepted
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
*         description: List of all invitations sent in a group and which have been accepted
*         content:
*           application/json:
*             schema:
*               type: array
*               items: 
*                   $ref: '#/components/schemas/Membership'
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
*       404:
*           description: Group not found
*           content:
*               application/json:
*                   example:
*                       message: "Group not found"   
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


/**
* @swagger
* /groups/members/user/{user_id}:
*   get:
*     summary: List of all groups of a user
*     tags: [Groups]
*     security:
*         - BearerAuth: []
*     parameters:
*         - in: path
*           name: user_id
*           required: true
*           schema:
*             type: string
*           description: Id of user
*     responses:
*       200:
*         description: List of all invitations sent in a group and which have been accepted
*         content:
*           application/json:
*             schema:
*               type: array
*               items: 
*                   $ref: '#/components/schemas/Membership'
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
*       404:
*           description: Group not found
*           content:
*               application/json:
*                   example:
*                       message: "Group not found"   
*       500:
*         description: Some server error
*         content:
*           application/json:
*             example:
*               message: "Error server."
*
*/   
app.route("groups/members/user/:user_id")
    .get(jwtMiddleware.verifyTokenUser, memberController.listenAllMemberOfUser)

}