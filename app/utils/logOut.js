export default () => {
  localStorage.clear();
  if (window.location.pathname !== '/') {
    window.location = '/';
  }
}
