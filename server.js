const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
    origin: process.env.BASEURL,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(dbConfig.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.redirect("/docs");
});

// routes
require("./app/routes/event.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/review.route")(app);
require("./swagger")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "organizer",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'organizer' to roles collection");
            });

            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
