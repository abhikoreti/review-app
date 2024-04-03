const db = require("../models");
const Review = db.review;

checkValidReview = (req, res, next) => {
    let reviewid = req.params.reviewid;

    if (!reviewid.match(/^[0-9a-zA-Z]+$/i)) {
        res.status(400).send({
            message: "Failed! reviewid should be alphanumeric only!",
        });
        return;
    }

    Review.findById(reviewid).exec((err, review) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!review) {
            res.status(400).send({
                message: "Failed! Review does not exists!",
            });
            return;
        }

        req.reviewObj = review;
        next();
    });
};

const verifyReview = {
    checkValidReview,
};

module.exports = verifyReview;
