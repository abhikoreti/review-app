const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Event = db.event;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { makeResponse } = require("../utils/common.js");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        events: [],
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send(
                            makeResponse(false, { message: err })
                        );
                        return;
                    }

                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                        if (err) {
                            res.status(500).send(
                                makeResponse(false, { message: err })
                            );
                            return;
                        }

                        res.status(200).send(
                            makeResponse(true, {
                                message: "User was registered successfully!",
                            })
                        );
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send(makeResponse(false, { message: err }));
                    return;
                }

                user.roles = [role._id];
                user.save((err) => {
                    if (err) {
                        res.status(500).send(
                            makeResponse(false, { message: err })
                        );
                        return;
                    }

                    res.status(200).send(
                        makeResponse(true, {
                            message: "User was registered successfully!",
                        })
                    );
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            if (!user) {
                return res
                    .status(404)
                    .send(makeResponse(false, { message: "User Not found." }));
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send(
                    makeResponse(false, {
                        accessToken: null,
                        message: "Invalid Password!",
                    })
                );
            }

            const token = jwt.sign(
                { id: user.id, username: user.username },
                config.secret,
                {
                    algorithm: "HS256",
                    allowInsecureKeySizes: true,
                    expiresIn: 86400,
                }
            );

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            res.status(200).send(
                makeResponse(true, {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                })
            );
        });
};

exports.attended = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (user.events.indexOf(req.eventObjId) != -1) {
            res.status(400).send(
                makeResponse(false, {
                    message: `User ${user.username} has already attended ${req.eventObjTitle}!`,
                })
            );
        } else {
            user.events.push(req.eventObjId);
            user.save((err) => {
                if (err) {
                    res.status(500).send(makeResponse(false, { message: err }));
                    return;
                }

                res.status(200).send(
                    makeResponse(true, {
                        message: `User ${user.username} attended ${req.eventObjTitle} successfully!`,
                    })
                );
            });
        }
    });
};
