const { authJwt, verifyEvent, verifyReview } = require("../middlewares");
const review_controller = require("../controllers/review.controller");

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
     * '/api/review/submit/{eventid}':
     *  post:
     *     tags:
     *     - Review Controller
     *     summary: Submit a review for an event
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
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - comment
     *              - registration_exp
     *              - event_exp
     *              - breakfast_exp
     *              - overall_exp
     *            properties:
     *              comment:
     *                type: string
     *                default: Running the Race for Peace Marathon was an unforgettable experience! The event was well-organized, the volunteers were encouraging, and crossing the finish line was a moment of triumph. Already looking forward to next year's race!
     *              registration_exp:
     *                type: integer
     *                default: 9
     *                minimum: 1
     *                maximum: 10
     *              event_exp:
     *                type: integer
     *                default: 9
     *                minimum: 1
     *                maximum: 10
     *              breakfast_exp:
     *                type: integer
     *                default: 8
     *                minimum: 1
     *                maximum: 10
     *              overall_exp:
     *                type: integer
     *                default: 9
     *                minimum: 1
     *                maximum: 10
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
        "/api/review/submit/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        review_controller.createReview
    );

    /**
     * @openapi
     * '/api/review/respond/{reviewid}':
     *  post:
     *     tags:
     *     - Review Controller
     *     summary: Submit a response for a review
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *           format: jwt
     *         required: true
     *       - in: path
     *         name: reviewid
     *         schema:
     *           type: string
     *         required: true
     *         description: The Review ID
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - organizer_response
     *            properties:
     *              organizer_response:
     *                type: string
     *                default: Hello, we hope you like our event. We will make sure there will be less water based colors next time
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
        "/api/review/respond/:reviewid",
        [
            authJwt.verifyToken,
            authJwt.isOrganizer,
            verifyReview.checkValidReview,
        ],
        review_controller.createResponse
    );

    /** GET Methods */
    /**
     * @openapi
     * '/api/review/like/{reviewid}':
     *  get:
     *     tags:
     *     - Review Controller
     *     summary: Like a review
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *           format: jwt
     *         required: true
     *       - in: path
     *         name: reviewid
     *         schema:
     *           type: string
     *         required: true
     *         description: The Review ID
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
        "/api/review/like/:reviewid",
        [authJwt.verifyToken, verifyReview.checkValidReview],
        review_controller.like
    );

    /**
     * @openapi
     * '/api/review/report/{reviewid}':
     *  get:
     *     tags:
     *     - Review Controller
     *     summary: Report a review
     *     parameters:
     *       - in: header
     *         name: x-access-token
     *         schema:
     *           type: string
     *           format: jwt
     *         required: true
     *       - in: path
     *         name: reviewid
     *         schema:
     *           type: string
     *         required: true
     *         description: The Review ID
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
        "/api/review/report/:reviewid",
        [authJwt.verifyToken, verifyReview.checkValidReview],
        review_controller.report
    );
};
