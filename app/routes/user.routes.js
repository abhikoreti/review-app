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

    app.post(
        "/api/user/create",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted,
        ],
        user_controller.signup
    );

    app.post("/api/user/login", user_controller.signin);

    // app.get("/api/test/all", user_controller.allAccess);

    app.get(
        "/api/user/attended/:eventid",
        [authJwt.verifyToken, verifyEvent.checkValidEvent],
        user_controller.attended
    );

    // app.get(
    //   "/api/test/org",
    //   [authJwt.verifyToken, authJwt.isOrganizer],
    //   user_controller.organizerBoard
    // );

    // app.get(
    //   "/api/test/admin",
    //   [authJwt.verifyToken, authJwt.isAdmin],
    //   user_controller.adminBoard
    // );
};
