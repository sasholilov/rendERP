import { LOCALE } from "./constants";
const currency = "лв";

export const formatDate = function (date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(LOCALE);
};

export const formatPrice = function (price) {
  const newPrice = `${price.toFixed(2)}${currency}`;
  return newPrice;
};
