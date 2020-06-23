import { create } from 'apisauce';
import config from 'config';
import logOut from './logOut'
import getToken from './getToken'

const apiV1Patient = 'api/v1/admin';

export const getHeaderConfig = (token) => ({
  Accept: 'application/json',
  'Accept-Language': 'en',
  Authorization: token && `Bearer ${token}`,
});


const apiMonitor = (response) => {
  if (response.data && response.data === 'Unauthorized') {
    logOut()
  }
};

export const apiCreate = () => {
  const token = getToken();
  const api = create({
    baseURL: `${config.api}/${apiV1Patient}`,
    headers: getHeaderConfig(token),
  });
  api.addMonitor(apiMonitor);
  return api;
};
