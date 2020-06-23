export default () => (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || undefined;
