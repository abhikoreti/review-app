const { authJwt, verifySignUp, verifyEvent } = require("../middlewares");
const user_controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /** POST Methods */
    /**
     * @openapi
     * '/api/user/create':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a new user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *              - roles
     *            properties:
     *              username:
     *                type: string
     *                default: sahil
     *              email:
     *                type: string
     *                default: sahil@gmail.com
     *              password:
     *                type: string
     *                default: 653000
     *              roles:
     *                type: array
     *                items:
     *                  type: string
     *                default: ["user", "moderator"]
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.post(
        "/api/user/create",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        user_controller.signup
    );

    /**
     * @openapi
     * '/api/user/login':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Login a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: sahil
     *              password:
     *                type: string
     *                default: 653000
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    app.post("/api/user/login", user_controller.signin);

    /** GET Methods */
    /**
     * @openapi
     * '/api/user/attended/{eventid}':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: User attends an event
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *           format: jwt
     *         required: true
     *       - in: path
     *         name: eventid
     *         schema:
     *           type: string
     *         required: true
     *         description: The Event ID
     *     responses:
     *      200:
     *        description: Success
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Server Error
     */
    app.get(
        "/api/user/attended/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        user_controller.attended
    );
};
