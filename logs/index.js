"use strict";

const log4js = require("log4js");
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
const config = require("../config");

const exist = path => {
  try {
    fs.accessSync(path, fs.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const mkdir = path => {
  try {
    shelljs.mkdir("-p", path);
    return true;
  } catch (error) {
    process.exit(1);
  }
};

const logDir = config.log.dir;
if (exist(logDir) === false) {
  mkdir(logDir);
}
log4js.configure(path.join(__dirname, "log4js.json"), { cwd: logDir });

module.exports = name => {
  return log4js.getLogger(name);
};
