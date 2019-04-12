import { flow, observable } from "mobx";
import { message } from "antd";
import ajax from '../lib/ask';

export default class SearchStore {
    @observable analystTable = {};      // 搜索数据表
    // 获取搜索数据表
    getAnalystTableSearch = flow(function* (params) {
        try {
            const data = yield ajax('apiAnalystTableSearch', {
                params
            });

            this.analystTable = data;
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取搜索数据表失败！');
        }
    })

    // 获取搜索数据图
    getAnalystChartSearch = flow(function* (params) {
        try {
            ajax('apiAnalystChartSearch', {
                params
            });
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取搜索数据图失败！')
        }
    })

    // 获取搜索数据表详情
    getAnalystTableDetail = flow(function* (params) {
        try {
            ajax('apiAnalystTableSearchDetail', {
                params
            });
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取搜索数据表详情失败!')
        }
    })

    // 获取搜索数据图详情
    getAnalystChartDetail = flow(function* (params) {
        try {
            ajax('apiAnalystChartSearchDetail', {
                params
            });
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取搜索数据图详情失败!')
        }
    })

}