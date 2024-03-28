const mongoose = require("mongoose");

const Review = mongoose.model(
    "Review",
    new mongoose.Schema({
        comment: String,
        registration_exp: {
            type: Number,
            min: [1, "Please provide rating in between 1 to 10!"],
            max: [10, "Please provide rating in between 1 to 10!"],
            default: 0,
        },
        event_exp: {
            type: Number,
            min: [1, "Please provide rating in between 1 to 10!"],
            max: [10, "Please provide rating in between 1 to 10!"],
            default: 0,
        },
        breakfast_exp: {
            type: Number,
            min: [1, "Please provide rating in between 1 to 10!"],
            max: [10, "Please provide rating in between 1 to 10!"],
            default: 0,
        },
        overall_exp: {
            type: Number,
            min: [1, "Please provide rating in between 1 to 10!"],
            max: [10, "Please provide rating in between 1 to 10!"],
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        reports: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        is_flagged: Boolean,
        organizer_response: String,
    })
);

module.exports = Review;
