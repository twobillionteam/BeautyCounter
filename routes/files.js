"use strict";

const Router = require("koa-router");
const router = new Router();
const send = require("koa-send");
const path = require("path");
const pathBase = path.resolve(__dirname, "..");

router.get("/", async ctx => {
  const { file } = ctx.query;
  await send(ctx, file, { root: pathBase + "/files" });
});

router.post("/", async ctx => {
  const file = ctx.request.files["file"];
  if (!file) {
    ctx.body = "upload file not found";
    return;
  }
  const { name, path, type } = file;

  ctx.body = {
    name,
    path,
    type
  };
});

module.exports = router;
