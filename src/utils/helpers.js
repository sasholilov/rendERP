import { LOCALE, CURRENCY } from "./constants";

export const formatDate = function (date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString(LOCALE);
};

export const formatPrice = function (price) {
  const newPrice = `${price.toFixed(2)}${CURRENCY}`;
  return newPrice;
};

export const isPaid = function (total, paidAmount) {
  if (total === paidAmount) return "Paid";
  else if (paidAmount === 0) return "Unpaid";
  else return "Partial";
};
