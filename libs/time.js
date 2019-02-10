"use strict";

const moment = require("moment-timezone");
const timezone = "Asia/Taipei";
const format = "YYYY-MM-DD HH:mm:ss";
const ONE_DAY = 60 * 60 * 24 * 1000;

const formatTimestamp = timestamp => {
  return moment(timestamp)
    .tz(timezone)
    .format(format);
};

const formatNow = () => {
  return moment()
    .tz(timezone)
    .format(format);
};

const dateNow = () => {
  return moment()
    .tz(timezone)
    .format("YYYY-MM-DD");
};

const dateStart = () => {
  let date = moment()
    .tz(timezone)
    .format("YYYY-MM-DD");
  date += " 00:00:00";
  return date;
};

const dateEnd = () => {
  let date = moment()
    .tz(timezone)
    .format("YYYY-MM-DD");
  date += " 23:59:59";
  return date;
};

const getSecondToNextDay = () => {
  const nowFormat = moment()
    .tz(timezone)
    .format(format);
  let endFormat = nowFormat.split(" ")[0];
  endFormat += " 23:59:59";
  const end = moment(endFormat).unix();
  const now = moment(nowFormat).unix();
  const diff = end - now;
  if (diff < 0) return 0;
  return diff;
};

const getSecondDiff = info => {
  const { date1, date2 } = info;
  const timestamp1 = moment(date1).unix();
  const timestamp2 = moment(date2).unix();
  const diff =
    timestamp1 - timestamp2 > 0
      ? timestamp1 - timestamp2
      : timestamp2 - timestamp1;
  return diff;
};

const getSecondToSpecificDate = date => {
  const nowFormat = moment()
    .tz(timezone)
    .format(format);
  const end = moment(date).unix();
  const now = moment(nowFormat).unix();
  const diff = end - now;
  if (diff < 0) return 0;
  return diff;
};

// date: 2019-02-25 00:00:00
const getDaysDiff = date => {
  const now = moment().unix();
  const open = moment(date).unix();
  const diff = now - open;
  const day = Math.ceil(diff / 86400);
  return day > 0 ? day : 1;
};

/**
 *
 * @param {*} start // 2018-12-10
 * @param {*} end   // 2018-12-18
 */
const getDatePeriod = (start, end) => {
  const periods = [];
  const days = Math.ceil(
    (moment(end).valueOf() - moment(start).valueOf()) / ONE_DAY
  );
  for (let i = 1; i < days + 1; i++) {
    const startTimestamp = moment(start).valueOf() + ONE_DAY * (i - 1);
    const endTimestamp = moment(start).valueOf() + ONE_DAY * i;
    periods.push({
      start: moment(startTimestamp).format(format),
      end: moment(endTimestamp).format(format)
    });
  }
  return periods;
};

const getOffset = () => {
  const localOffset = moment().utcOffset();
  const timezoneOffset = moment().tz(timezone)._offset;
  const offset = timezoneOffset - localOffset;
  return offset * 60 * 1000;
};

const timestamp = date => {
  return moment(date).unix();
};

const timestampNow = () => {
  return moment().unix();
};

module.exports = {
  formatTimestamp,
  formatNow,
  dateNow,
  dateStart,
  dateEnd,
  getSecondToNextDay,
  getSecondDiff,
  getSecondToSpecificDate,
  getDaysDiff,
  getDatePeriod,
  timestamp,
  timestampNow
};
