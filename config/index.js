"use strict";

const path = require("path");
const debug = require("debug")("server:config");
const pathBase = path.resolve(__dirname, "..");
const config = {
  env: process.env.ENV || "development",
  log: {
    dir: path.resolve(pathBase, "log")
  }
};

debug(`Looking for environment overrides for ENV "${config.env}".`);
let overrides = {};
if (config.env === "development") {
  overrides = require("./config.json");
} else {
  overrides = require(`./config_${config.env}.json`);
}

if (overrides) {
  debug("Found overrides, applying to default configuration.");
  Object.assign(config, overrides);
} else {
  debug("No environment overrides found, defaults will be used.");
}

if (config.env !== "development") {
  config.api.port = Number(process.env.API_PORT) || 3000;
  config.worker = process.env.WORKER || "FALSE";
}

config.getCors = () => {
  const { cors } = config.api;
  return cors.split(",");
};

module.exports = config;
