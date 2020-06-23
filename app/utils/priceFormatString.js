export default (v='') => {
  v= `${v}`;
  const index = v.indexOf('.');
  if(index!==-1){
    v = `${v.substr(0,index)}${v.substr(index,3)}`
  }
  return v;
};
