const db = require("../models");
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
                res.status(500).send({ message: err });
                return;
            }
            if (review) {
                res.status(400).send({
                    message: `Failed! User's review is already submitted for ${req.eventObjTitle} event!`,
                });
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
                        res.status(500).send({ message: err });
                        return;
                    }

                    if (user.events.indexOf(req.eventObjId) != -1) {
                        review.user = user._id;
                        review.event = req.eventObjId;
                        review.save((err) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }

                            res.send({
                                message: `User ${user.username}'s review submitted for ${req.eventObjTitle} event successfully!`,
                                reviewid: review._id,
                            });
                        });
                    } else {
                        res.status(400).send({
                            message: `User ${user.username} cannot submit review as they did not attended ${req.eventObjTitle} event!`,
                        });
                    }
                });
            }
        }
    );
};

exports.like = (req, res) => {
    Review.findById(req.params.reviewid).exec((err, review) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (review.is_flagged) {
            res.status(400).send({
                message: `Falied! Review is flagged!`,
            });
        }

        if (review.likes.indexOf(req.userId) != -1) {
            res.status(400).send({
                message: `Falied! User has already liked the review!`,
            });
        } else if (review.reports.indexOf(req.userId) != -1) {
            res.status(400).send({
                message: `Falied! User has already reported the review!`,
            });
        } else {
            review.likes.push(req.userId);
            review.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({
                    message: `User liked the review successfully!`,
                });
            });
        }
    });
};

exports.report = (req, res) => {
    Review.findById(req.params.reviewid).exec((err, review) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (review.reports.indexOf(req.userId) != -1) {
            res.status(400).send({
                message: `Falied! User has already reported the review!`,
            });
        } else if (review.likes.indexOf(req.userId) != -1) {
            res.status(400).send({
                message: `Falied! User has already liked the review!`,
            });
        } else {
            review.reports.push(req.userId);
            if (review.reports.length > 4) {
                review.is_flagged = true;
            }
            review.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.send({
                    message: `User ${req.userName} reported the review successfully!`,
                });
            });
        }
    });
};
