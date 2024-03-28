const mongoose = require("mongoose");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        eventid: String,
        title: String,
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    })
);

module.exports = Event;
