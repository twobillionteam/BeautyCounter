"use strict";

const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const config = require("../config");
const prefix = `/beautycounter/api/v${config.api.version}`;

const routes = {
  setup: app => {
    const api = new Router({ prefix });
    const rootApi = new Router({ prefix: `/beautycounter` });
    rootApi.get("/", async (ctx, next) => {
      ctx.status = 200;
      ctx.body = "ok";
      return;
    });
    // provide jsdoc
    if (config.api.swagger === "true") {
      const swaggerSpec = require("../swagger");
      rootApi.get("/swagger.json", async (ctx, next) => {
        ctx.body = swaggerSpec;
      });
    }
    app.use(rootApi.routes());

    console.log(`[ROUTERS] api routes use prefix ${prefix}`);
    fs.readdirSync(__dirname)
      .filter(file => {
        return file.slice(-3) === ".js" && file !== basename;
      })
      .map(file => {
        const route = require(path.join(__dirname, file));
        const name = file.split(".")[0];
        api.use(`/${name}`, route.routes(), route.allowedMethods());
      });
    app.use(api.routes());
  }
};

module.exports = routes;
