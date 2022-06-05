// expected arr value format -> [{ id: string, name: string }]
const getNameValue = (arr, str) => {
  if (!!arr && !!str) return arr.find((obj) => obj.id === str)?.name;
};

export default getNameValue;
