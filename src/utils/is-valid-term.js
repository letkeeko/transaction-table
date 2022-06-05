// basic string validation
// use for filtering - search term and selected category
const isValidTerm = (str) => {
  return !!str && str.length > 2;
};

export default isValidTerm;
