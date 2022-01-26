let formattedDate = (datetime) => {
  const locale = "de-DE";
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (formattedDate = datetime.toLocaleDateString(locale, dateFormat));
};

let formattedTime = (datetime) => {
  const locale = "de-DE";
  const timeFormat = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return (formattedTime = datetime.toLocaleTimeString(locale, timeFormat));
};

module.exports = {
  formattedDate,
  formattedTime,
};
