import { LOCALE, CURRENCY } from "./constants";

export const formatDate = function (date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(LOCALE);
};

export const formatPrice = function (price) {
  const newPrice = `${price.toFixed(2)}${CURRENCY}`;
  return newPrice;
};
