"use strict";

const Koa = require("koa");
const logger = require("./logs")("server");
// const bodyParser = require("koa-bodyparser");
const bodyParser = require("koa-body");
const routes = require("./routes");
const middleware = require("./libs/middleware");
const config = require("./config");
const cors = require("koa2-cors");
const path = require("path");

const app = new Koa();
app.use(
  bodyParser({
    multipart: true,
    formLimit: "5mb",
    jsonLimit: "5mb",
    textLimit: "5mb",
    encoding: "gzip",
    formidable: {
      uploadDir: path.join(__dirname, "files")
    }
  })
);

if (config.env === "test" || config.env === "development") {
  app.use(cors());
  app.use(middleware.log);
} else {
  app.use(middleware.cors);
}

// provide swagger ui
const serve = require("koa-static");
const mount = require("koa-mount");
app.use(mount("/beautycounter", serve(__dirname + "/public")));

routes.setup(app);

app.use((ctx, next) => {
  return next().catch(err => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        error: "Protected resource, use Authorization header to get access"
      };
    } else if ("ValidationError" === err.name) {
      ctx.status = 400;
      ctx.body = { error: "Argument Error" };
    } else if ("Data not found" === err) {
      ctx.status = 404;
      ctx.body = { error: "Data not found" };
    } else {
      logger.error(err);
      throw err;
    }
  });
});

process.on("uncaughtException", err => {
  logger.error(err);
  console.log(err);
});

app.listen(config.api.port, () => {
  console.log(
    `[SERVER] server run on environment: ${config.env}, port: ${
      config.api.port
    }`
  );
  console.log(
    `[SERVER] swagger ui serve on ${config.api.host}:${config.api.port}`
  );
});

module.exports = app;
