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
     *     security:
     *       - bearerAuth: []
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
     *     security:
     *       - bearerAuth: []
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
     *       - in: path
     *         name: eventid
     *         schema:
     *           type: string
     *         required: true
     *         description: The Event ID
     *     security:
     *       - bearerAuth: []
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

    /**
     * @openapi
     * '/api/event/allevents':
     *  get:
     *     tags:
     *     - Event Controller
     *     summary: Get all events in database
     *     security:
     *       - bearerAuth: []
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
        "/api/event/allevents",
        [authJwt.verifyToken],
        event_controller.getAllEvents
    );
};
