import { define } from './api_helper';

const url = 'https://api-invest-dev.modeling.ai';
const apiObject = {
  command: {
    getMainPart: {
      url: `${url}/api/note/noteCommand/company/suggest`,
      method: 'get'
    }
  }
};
export default define(apiObject);
