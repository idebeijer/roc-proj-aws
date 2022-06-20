import { utcToZonedTime } from "date-fns-tz";
import { fromUnixTime } from "date-fns";
import format from "date-fns-tz/format/index";

export const toTimestamp = (date) => {
  const timeZone = "Europe/Amsterdam";
  const zonedDate = utcToZonedTime(date, timeZone);
  return Date.parse(zonedDate);
};

export const unixToUtc = (unixTime) => {
  const newTime = unixTime / 1000;
  return format(new Date(newTime * 1000), "MMM dd' 'HH:mm");
};
