import {define} from './api_helper';

const url = '/api';
const apiObject = {
  test: {
    url: `${url}/extra/site-infos`,
    method: 'post'
  }
};
export default define(apiObject);
