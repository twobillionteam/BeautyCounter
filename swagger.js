"use strict";

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  info: {
    title: "beautycounter backend api", // Title (required)
    version: "1.0.0", // Version (required)
    description: "beautycounter backend api" // Description (optional)
  },
  schemes: ["https", "http"]
  // host: config.post.host // Host (optional)
  // basePath: "/" // Base path (optional)
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
