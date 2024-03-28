const db = require("../models");
const Event = db.event;

checkValidEvent = (req, res, next) => {
    let eventid = req.params.eventid;

    if (!eventid.match(/^[0-9a-z\-]+$/i)) {
        res.status(400).send({
            message: "Failed! eventid should be alphanumeric only!",
        });
        return;
    }

    Event.findOne({
        eventid: eventid,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            res.status(400).send({
                message: "Failed! Event does not exists!",
            });
            return;
        }

        next();
    });
};

checkDuplicateEvent = (req, res, next) => {
    let eventid = req.body.eventid;

    if (!eventid.match(/^[0-9a-z\-]+$/i)) {
        res.status(400).send({
            message: "Failed! eventid should be alphanumeric only!",
        });
        return;
    }

    Event.findOne({
        eventid: eventid,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Failed! Event with same eventid already exists!",
            });
            return;
        }

        next();
    });
};

const verifyEvent = {
    checkDuplicateEvent,
    checkValidEvent,
};

module.exports = verifyEvent;
