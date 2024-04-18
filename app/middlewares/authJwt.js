const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const { makeResponse } = require("../utils/common.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res
            .status(403)
            .send(makeResponse(false, { message: "No token provided!" }));
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send(
                makeResponse(false, {
                    message: "Unauthorized!",
                })
            );
        }
        req.userId = decoded.id;
        req.userName = decoded.username;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send(makeResponse(false, { message: err }));
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send(
                    makeResponse(false, { message: "Require Admin Role!" })
                );
                return;
            }
        );
    });
};

isOrganizer = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send(makeResponse(false, { message: err }));
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "organizer") {
                        next();
                        return;
                    }
                }

                res.status(403).send(
                    makeResponse(false, { message: "Require Organizer Role!" })
                );
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isOrganizer,
};
module.exports = authJwt;
