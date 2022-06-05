const formatTime = (str) => {
  // expected str value format -> 2019-05-23T20:35:58
  const pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}T/;

  if (pattern.test(str)) return `Time: ${str.replace(pattern, "").slice(0, 5)}`;

  return "Unexpected value";
};

export default formatTime;
