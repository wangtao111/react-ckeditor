import BaseApi from './baseApi';
import menuApi from './menuApi';
import noteApi from './noteApi';
import searchApi from './searchApi';

export default Object.assign({},
    BaseApi,
    menuApi,
    noteApi,
    searchApi
);