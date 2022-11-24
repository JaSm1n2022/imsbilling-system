// @flow

import { appsConfig } from '../config';
import { removeAuthToken } from './storageManager';

/**
 * remove token from local storage and redirect to login
 * @returns {Undefined} -
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  removeAuthToken();
  
};
