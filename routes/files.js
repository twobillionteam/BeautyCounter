"use strict";

const Router = require("koa-router");
const router = new Router();

router.get("/", async ctx => {
  ctx.body = {
    data: "TEST"
  };
  return;
});

module.exports = router;