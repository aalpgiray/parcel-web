export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GetDatePretty = (dateS: string) => {
  const date = new Date(dateS);

  const prettyDate =
    date.getDate() + " " + Months[date.getMonth()] + " " + date.getFullYear();
  return prettyDate;
};
