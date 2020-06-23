export default (d, cb, ecb) => {

  ecb = ecb || (() => {
  });
  if (d && d.payload) {
    const {data, status} = d.payload;
    if ((status === 200 || status === 304) && data) {
      return cb(data);
    }
    if (status >= 400 && status < 600 && data) {
      if (!ecb && cb) {
        return cb(d.payload);
      }
      return ecb(d.payload);
    }
  }
  return cb({});
};
