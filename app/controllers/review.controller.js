const db = require("../models");
const { makeResponse } = require("../utils/common.js");
const User = db.user;
const Event = db.event;
const Review = db.review;

exports.createReview = (req, res) => {
    Review.findOne(
        {
            user: req.userId,
            event: req.eventObjId,
        },
        (err, review) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }
            if (review) {
                res.status(400).send(
                    makeResponse(false, {
                        message: `Failed! User's review is already submitted for ${req.eventObjTitle} event!`,
                    })
                );
                return;
            } else {
                const review = new Review({
                    comment: req.body.comment,
                    registration_exp: req.body.registration_exp,
                    breakfast_exp: req.body.breakfast_exp,
                    event_exp: req.body.event_exp,
                    overall_exp: req.body.overall_exp,
                    likes: [],
                    reports: [],
                    is_flagged: false,
                    organizer_response: "",
                });

                User.findById(req.userId).exec((err, user) => {
                    if (err) {
                        res.status(500).send(
                            makeResponse(false, { message: err })
                        );
                        return;
                    }

                    if (user.events.indexOf(req.eventObjId) != -1) {
                        review.user = user._id;
                        review.event = req.eventObjId;
                        review.save((err) => {
                            if (err) {
                                res.status(500).send(
                                    makeResponse(false, { message: err })
                                );
                                return;
                            }

                            res.status(200).send(
                                makeResponse(true, {
                                    message: `User ${user.username}'s review submitted for ${req.eventObjTitle} event successfully!`,
                                    reviewid: review._id,
                                })
                            );
                        });
                    } else {
                        res.status(400).send(
                            makeResponse(false, {
                                message: `User ${user.username} cannot submit review as they did not attended ${req.eventObjTitle} event!`,
                            })
                        );
                    }
                });
            }
        }
    );
};

exports.like = (req, res) => {
    let review = req.reviewObj;

    if (review.is_flagged) {
        res.status(400).send(
            makeResponse(false, {
                message: `Failed! Review is flagged!`,
            })
        );
    }

    if (review.likes.indexOf(req.userId) != -1) {
        res.status(400).send(
            makeResponse(false, {
                message: `Falied! User has already liked the review!`,
            })
        );
    } else if (review.reports.indexOf(req.userId) != -1) {
        res.status(400).send(
            makeResponse(false, {
                message: `Falied! User has already reported the review!`,
            })
        );
    } else {
        review.likes.push(req.userId);
        review.save((err) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            res.status(200).send(
                makeResponse(true, {
                    message: `User liked the review successfully!`,
                })
            );
        });
    }
};

exports.report = (req, res) => {
    let review = req.reviewObj;

    if (review.reports.indexOf(req.userId) != -1) {
        res.status(400).send(
            makeResponse(false, {
                message: `Falied! User has already reported the review!`,
            })
        );
    } else if (review.likes.indexOf(req.userId) != -1) {
        res.status(400).send(
            makeResponse(false, {
                message: `Falied! User has already liked the review!`,
            })
        );
    } else {
        review.reports.push(req.userId);
        if (review.reports.length > 4) {
            review.is_flagged = true;
        }
        review.save((err) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            res.status(200).send(
                makeResponse(true, {
                    message: `User reported the review successfully!`,
                })
            );
        });
    }
};

exports.createResponse = (req, res) => {
    let review = req.reviewObj;

    if (review.is_flagged) {
        res.status(400).send(
            makeResponse(false, {
                message: `Cannot respond! Review is flagged!`,
            })
        );
        return;
    }

    if (review.organizer_response != "") {
        res.status(400).send(
            makeResponse(false, {
                message: `Failed! Organizer ${req.userName} has already responded to the review!`,
            })
        );
        return;
    }

    Event.findById(review.event).exec((err, event) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }
        if (req.userId != event.organizer.toString()) {
            res.status(400).send(
                makeResponse(false, {
                    message: `Organizer ${req.userName} did not organize the ${event.title} event. Hence cannot respond!`,
                })
            );
        } else {
            review.organizer_response = req.body.organizer_response;
            review.save((err) => {
                if (err) {
                    res.status(500).send(makeResponse(false, { message: err }));
                    return;
                }

                res.status(200).send(
                    makeResponse(true, {
                        message: `Organizer ${req.userName} submitted response for event successfully!`,
                    })
                );
            });
        }
    });
};
