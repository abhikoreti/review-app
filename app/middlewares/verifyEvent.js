const db = require("../models");
const { makeResponse } = require("../utils/common.js");
const Event = db.event;

checkValidEvent = (req, res, next) => {
    let eventid = req.params.eventid;

    if (!eventid.match(/^[0-9a-z\-]+$/i)) {
        res.status(400).send(
            makeResponse(false, {
                message: "Failed! eventid should be alphanumeric only!",
            })
        );
        return;
    }

    Event.findOne({
        eventid: eventid,
    }).exec((err, event) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (!event) {
            res.status(400).send(
                makeResponse(false, {
                    message: "Failed! Event does not exists!",
                })
            );
            return;
        }

        req.eventObjId = event._id;
        req.eventObjTitle = event.title;
        next();
    });
};

checkDuplicateEvent = (req, res, next) => {
    let eventid = req.body.eventid;

    if (!eventid.match(/^[0-9a-z\-]+$/i)) {
        res.status(400).send(
            makeResponse(false, {
                message: "Failed! eventid should be alphanumeric only!",
            })
        );
        return;
    }

    Event.findOne({
        eventid: eventid,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send(makeResponse(false, { message: err }));
            return;
        }

        if (user) {
            res.status(400).send(
                makeResponse(false, {
                    message: "Failed! Event with same eventid already exists!",
                })
            );
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
