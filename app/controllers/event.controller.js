const mongoose = require("mongoose");
const db = require("../models");
const { makeResponse } = require("../utils/common.js");
const User = db.user;
const Review = db.review;
const Event = db.event;

exports.create = (req, res) => {
    const event = new Event({
        eventid: req.body.eventid,
        title: req.body.title,
    });

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        event.organizer = user._id;
        event.save((err) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            res.status(200).send(
                makeResponse(true, {
                    message: `Event ${req.body.eventid} created by organizer ${user.username} successfully!`,
                })
            );
        });
    });
};

exports.paginate = (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const reviewCount = 5;
    Review.find({ event: req.eventObjId })
        .skip((page - 1) * reviewCount)
        .limit(reviewCount)
        .exec((err, review) => {
            if (err) {
                res.status(500).send(makeResponse(false, { message: err }));
                return;
            }

            if (!review || review.length === 0) {
                res.status(400).send(
                    makeResponse(false, {
                        message: `No reviews found for this event`,
                    })
                );
                return;
            }

            Review.countDocuments(
                { event: req.eventObjId },
                (err, totalDocuments) => {
                    if (err) {
                        res.status(500).send(
                            makeResponse(false, { message: err })
                        );
                        return;
                    }

                    res.status(200).send(
                        makeResponse(true, {
                            message: `Page ${page}: Reviews of ${req.eventObjTitle} event`,
                            totalReviews: totalDocuments,
                            page: `${page} of ${Math.ceil(
                                totalDocuments / reviewCount
                            )}`,
                            reviews: review,
                        })
                    );
                }
            );
        });
};

exports.summary = (req, res) => {
    Review.aggregate([
        { $match: { event: req.eventObjId } },
        {
            $group: {
                _id: null,
                registration_exp: { $avg: "$registration_exp" },
                event_exp: { $avg: "$event_exp" },
                breakfast_exp: { $avg: "$breakfast_exp" },
                overall_exp: { $avg: "$overall_exp" },
            },
        },
        {
            $project: {
                registration_exp: { $round: ["$registration_exp", 0] },
                event_exp: { $round: ["$event_exp", 0] },
                breakfast_exp: { $round: ["$breakfast_exp", 0] },
                overall_exp: { $round: ["$overall_exp", 0] },
            },
        },
    ]).exec((err, review) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (!review || review.length === 0) {
            res.status(400).send(
                makeResponse(false, {
                    message: `No reviews found for this event`,
                })
            );
            return;
        }

        const result = review[0];

        res.status(200).send(
            makeResponse(true, {
                message: `Summarized reviews of ${req.eventObjTitle}`,
                avg_registration_exp: result.registration_exp,
                avg_event_exp: result.event_exp,
                avg_breakfast_exp: result.breakfast_exp,
                avg_overall_exp: result.overall_exp,
            })
        );
    });
};
