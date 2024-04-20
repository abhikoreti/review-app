const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Review API",
            description:
                "API for event review services, documented on Swagger for easy integration.",
            contact: {
                name: "Abhinay Koreti",
                email: "abhinavkoreti727@gmail.com",
            },
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://review-app-cyan.vercel.app/",
                description: "Live server",
            },
            {
                url: "http://localhost:8080/",
                description: "Local server",
            },
        ],
    },
    // looks for configuration in specified directories
    apis: ["app/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
    // Swagger Page
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Documentation in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
