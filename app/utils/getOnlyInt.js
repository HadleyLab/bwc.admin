export default (value) => {
  const nonNumericRegex = /[^0-9]+/g;
  return value
    .replace(nonNumericRegex, '');
};
