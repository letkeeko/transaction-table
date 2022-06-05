// mock svg icon
const getStatusIcon = (str) => {
  if (str === "incomplete") return "!";

  if (str === "exported") return String.fromCharCode("10095");
  if (str === "complete") return String.fromCharCode("10004");

  return "Unexpected value";
};

export default getStatusIcon;
