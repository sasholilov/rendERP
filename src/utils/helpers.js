import { LOCALE } from "./constants";

export const formatDate = function (date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(LOCALE);
};
