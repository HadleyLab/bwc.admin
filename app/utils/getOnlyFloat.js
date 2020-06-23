export default (value) => {
  const nonNumericRegex = /[^0-9.]+/g;
  return value
    .replace(nonNumericRegex, '')
    .replace(/(\.\d\d)\d+/g, '$1')
    .replace(/^\./g, '0.');
};
