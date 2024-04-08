const db = require("../models");
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
            res.status(500).send({ message: err });
            return;
        }

        event.organizer = user._id;
        event.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({
                message: `Event ${req.body.eventid} created by organizer ${user.username} successfully!`,
            });
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
                res.status(500).send({ message: err });
                return;
            }

            if (!review || review.length === 0) {
                res.status(400).send({
                    message: `No reviews found for this event`,
                });
                return;
            }

            Review.countDocuments({ event: req.eventObjId }, (err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                res.status(200).send({
                    message: `Page ${page}: Reviews of ${req.eventObjTitle} event`,
                    review: review,
                });
            });
        });
};
