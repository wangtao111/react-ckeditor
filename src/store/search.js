import { flow, observable } from "mobx";
import { message } from "antd";
import ajax from '../lib/ask';
import axios from "axios";

export default class SearchStore {
    @observable analystTable = {};      // 搜索数据表
    @observable analystChart = {};      // 搜索数据图

    @observable chartLoading = true;    // 图表加载中
    // 获取搜索数据表
    getAnalystTableSearch = flow(function* (params) {
        try {
            const data = yield ajax('apiAnalystTableSearch', {
                params
            });

            yield Promise.all(data.items.map(async (item) => {
                const responseData = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${item.table_data}`);
                item.table_data = responseData.data || {};
                return item;
            })).then(tableData => {
                data.items = tableData;
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
            const data = yield ajax('apiAnalystChartSearch', {
                params
            });

            yield Promise.all(data.item.map(async (item) => {
                const responseData = await axios.get(`${'https://cors-anywhere.herokuapp.com/'}${item.data_file}`);
                item.chart_data = responseData.data;
                return item;
            })).then(chartData => {
                data.item = chartData;
            });
            
            this.chartLoading = false;
            this.analystChart = data;
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取搜索数据图失败！')
        }
    })

    // 获取搜索数据表详情
    getAnalystTableDetail = flow(function* (params) {
        try {
            yield ajax('apiAnalystTableSearchDetail', {
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