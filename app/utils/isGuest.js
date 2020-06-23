import getToken from 'utils/getToken';

export default () => {
  const token = getToken();
  return !token;
};

