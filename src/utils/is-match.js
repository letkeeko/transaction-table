// unidentical matching string with includes
const isMatch = (str1, str2) => {
  if (!str1 && !str2) {
    return "";
  }

  if (typeof str1 === "number") {
    return str1.toString().includes(str2.toLowerCase());
  }

  return str1.toLowerCase().includes(str2.toLowerCase());
};

export default isMatch;
