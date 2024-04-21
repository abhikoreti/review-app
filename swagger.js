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
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.16.2/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.16.2/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.16.2/swagger-ui.min.css",

        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.16.2/swagger-ui.css",
    ],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app) {
    // Swagger Page
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, options));
    // Documentation in JSON format
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;
