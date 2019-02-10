"use strict";

/**
 * @param  {} keys
 * @param  {} ctx
 */
const checkBody = async (keys, ctx) => {
  keys.forEach(key => {
    if (!ctx.request.body[key]) {
      ctx.body = {
        code: 0,
        message: `provide ${key} in request body`
      };
      return false;
    }
  });
  return true;
};

module.exports = {
  checkBody
};
