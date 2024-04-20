const { authJwt, verifyEvent } = require("../middlewares");
const event_controller = require("../controllers/event.controller");

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
     * '/api/event/create':
     *  post:
     *     tags:
     *     - Event Controller
     *     summary: Create a new event
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *           format: jwt
     *         required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - eventid
     *              - title
     *            properties:
     *              eventid:
     *                type: string
     *                default: game
     *              title:
     *                type: string
     *                default: Downhill Domination
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
        "/api/event/create",
        [
            authJwt.verifyToken,
            authJwt.isOrganizer,
            verifyEvent.checkDuplicateEvent,
        ],
        event_controller.create
    );

    /** GET Methods */
    /**
     * @openapi
     * '/api/event/reviews/{eventid}/{page}':
     *  get:
     *     tags:
     *     - Event Controller
     *     summary: Paginated reviews of an event
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
     *       - in: path
     *         name: page
     *         schema:
     *           type: integer
     *           minimum: 1
     *         required: true
     *         description: Page Number
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
        "/api/event/reviews/:eventid/:page",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        event_controller.paginate
    );

    /**
     * @openapi
     * '/api/event/summary/{eventid}':
     *  get:
     *     tags:
     *     - Event Controller
     *     summary: Summary of an event
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
        "/api/event/summary/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        event_controller.summary
    );
};
