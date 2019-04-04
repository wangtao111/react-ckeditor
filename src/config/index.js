import BaseApi from './baseApi';
import menuApi from './menuApi';
import noteApi from './noteApi';

export default Object.assign({},
    BaseApi,
    menuApi,
    noteApi
);