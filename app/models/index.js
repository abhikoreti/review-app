const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.event = require("./event.model");
db.review = require("./review.model");

db.ROLES = ["user", "admin", "organizer"];

module.exports = db;
