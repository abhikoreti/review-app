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

    app.post(
        "/api/review/submit/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        review_controller.createReview
    );

    app.post(
        "/api/review/respond/:reviewid",
        [
            authJwt.verifyToken,
            authJwt.isOrganizer,
            verifyReview.checkValidReview,
        ],
        review_controller.createResponse
    );

    app.get(
        "/api/review/like/:reviewid",
        [authJwt.verifyToken, verifyReview.checkValidReview],
        review_controller.like
    );

    app.get(
        "/api/review/report/:reviewid",
        [authJwt.verifyToken, verifyReview.checkValidReview],
        review_controller.report
    );
};
