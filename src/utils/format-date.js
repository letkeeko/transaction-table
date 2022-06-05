const formatDate = (str) => {
  // expected str value format -> 2019-05-23T20:35:58
  const pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

  const trimmed = str.slice(0, 10);

  if (pattern.test(trimmed)) {
    const year = trimmed.slice(0, 4);

    const month = getMonth(trimmed.slice(5, 7));

    const day = trimmed.slice(8, 10);

    // result -> 23 May 2019
    return `${day} ${month} ${year}`;
  }

  return "Unexpected value";
};

// expected strNum value format '02'
const getMonth = (strNum) => {
  const index = parseFloat(strNum) - 1;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // get month based on index e.g. 11 = 'DEC'
  if (!!months[index]) return months[index];

  return "Unexpected value";
};

export default formatDate;
