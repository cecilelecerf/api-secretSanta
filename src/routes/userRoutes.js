const jwtMiddleware = require("../middlwares/jwtMiddlware")
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API pour la gestion des utilisateurs
 */

module.exports = (app) => {
    const userController = require("../controllers/userController")
    
    /**
     * @swagger
     * path:
     *   /users/register:
     *     post:
     *       summary: Inscription d'un nouvel utilisateur
     *       tags: [Users]
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       responses:
     *         '200':
     *           description: Utilisateur enregistré avec succès
     *         '400':
     *           description: Erreur de validation des données
     */
    app.route("/users/register")
        .post(userController.userRegister);

    /**
     * @swagger
     * path:
     *   /users/login:
     *     post:
     *       summary: Connexion d'un utilisateur existant
     *       tags: [Users]
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       responses:
     *         '200':
     *           description: Connexion réussie
     *         '401':
     *           description: Identifiants invalides
     */
    app.route("/users/login")
        .post(userController.userLogin);

    /**
     * @swagger
     * path:
     *   /users:
     *     get:
     *       summary: Récupérer la liste de tous les utilisateurs
     *       tags: [Users]
     *       security:
     *         - BearerAuth: []
     *       responses:
     *         '200':
     *           description: Liste d'utilisateurs récupérée avec succès
     *         '401':
     *           description: Non autorisé (JWT invalide ou manquant)
     */
    app.route("/users")
        .get(userController.listenAllUsers);

    /**
     * @swagger
     * path:
     *   /users/{user_id}:
     *     get:
     *       summary: Récupérer les détails d'un utilisateur par ID
     *       tags: [Users]
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: path
     *           name: user_id
     *           required: true
     *           schema:
     *             type: string
     *           description: ID de l'utilisateur à récupérer
     *       responses:
     *         '200':
     *           description: Détails de l'utilisateur récupérés avec succès
     *         '401':
     *           description: Non autorisé (JWT invalide ou manquant)
     *         '404':
     *           description: Utilisateur non trouvé
     */
    app.route("/users/:user_id")
        .get(jwtMiddleware.verifyToken, userController.listenSingleUser);

    /**
     * @swagger
     * path:
     *   /users/{user_id}:
     *     put:
     *       summary: Mettre à jour les détails d'un utilisateur par ID
     *       tags: [Users]
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: path
     *           name: user_id
     *           required: true
     *           schema:
     *             type: string
     *           description: ID de l'utilisateur à mettre à jour
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       responses:
     *         '200':
     *           description: Utilisateur mis à jour avec succès
     *         '401':
     *           description: Non autorisé (JWT invalide ou manquant)
     *         '404':
     *           description: Utilisateur non trouvé
     */
    app.route("/users/:user_id")
        .put(jwtMiddleware.verifyToken, userController.updateUser);   
        
    /**
     * @swagger
     * path:
     *   /users/{user_id}:
     *     delete:
     *       summary: Supprimer un utilisateur par ID
     *       tags: [Users]
     *       security:
     *         - BearerAuth: []
     *       parameters:
     *         - in: path
     *           name: user_id
     *           required: true
     *           schema:
     *             type: string
     *           description: ID de l'utilisateur à supprimer
     *       responses:
     *         '200':
     *           description: Utilisateur supprimé avec succès
     *         '401':
     *           description: Non autorisé (JWT invalide ou manquant)
     *         '404':
     *           description: Utilisateur non trouvé
     */ 
    app.route("/users/:user_id")
        .delete(jwtMiddleware.verifyToken, userController.deleteUser);

}