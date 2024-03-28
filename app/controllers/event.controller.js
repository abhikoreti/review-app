const db = require("../models");
const User = db.user;
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

            res.send({
                message: `Event ${req.body.eventid} created by organizer ${user.username} successfully!`,
            });
        });
    });
};
