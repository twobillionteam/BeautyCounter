"use strict";

const logger = require("../logs")("http");
const config = require("../config");
const corssDomain = config.getCors();
console.log(`[ROUTERS] allow corss domain: ${corssDomain}`);

const log = async (ctx, next) => {
  const { method, path, ip } = ctx;
  let text = `${method} ${path} from: ${ip}`;
  if (method === "POST") {
    const { body } = ctx.request;
    Object.keys(body).forEach(key => {
      const value = body[key];
      text += ` ${key}: ${value}`;
    });
  }
  const user_id = ctx.headers["user-id"] || "";
  if (user_id !== "") text += ` user-id: ${user_id}`;
  logger.info(text);
  await next();
};

const cors = async (ctx, next) => {
  const { origin } = ctx.headers;
  for (let cor of corssDomain) {
    if (origin === cor) {
      ctx.set("Access-Control-Allow-Origin", cor);
      ctx.set(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, PUT, POST, DELETE"
      );
      ctx.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, User-ID, User-Token"
      );
    }
  }
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200;
  }
  await next();
};

module.exports = {
  log,
  cors
};
