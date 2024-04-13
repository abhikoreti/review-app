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

    app.post(
        "/api/event/create",
        [
            authJwt.verifyToken,
            authJwt.isOrganizer,
            verifyEvent.checkDuplicateEvent,
        ],
        event_controller.create
    );

    app.get(
        "/api/event/reviews/:eventid/:page",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        event_controller.paginate
    );

    app.get(
        "/api/event/summary/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        event_controller.summary
    );
};
