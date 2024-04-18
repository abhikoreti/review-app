const db = require("../models");
const { makeResponse } = require("../utils/common.js");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (user) {
            res.status(400).send(
                makeResponse(false, {
                    message: "Failed! Username is already in use!",
                })
            );
            return;
        }

        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            if (user) {
                res.status(400).send(
                    makeResponse(false, {
                        message: "Failed! Email is already in use!",
                    })
                );
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send(
                    makeResponse(false, {
                        message: `Failed! Role ${req.body.roles[i]} does not exist!`,
                    })
                );
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
