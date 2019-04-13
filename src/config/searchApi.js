/*
 * @Description: 综合搜索的API
 * @Company: ABC
 * @Author: lfzhu
 * @LastEditors: lfzhu
 * @Date: 2019-04-12 09:12:18
 * @LastEditTime: 2019-04-12 11:31:07
 */
const searchApi = {
    // 数据表搜索
    apiAnalystTableSearch: {
        url: '/api/note/noteAnalyst/table/search',
        method: 'get'
    },
    // 数据图搜索
    apiAnalystChartSearch: {
        url: '/api/note/noteAnalyst/chart/search',
        method: 'get'
    },
    // 数据表详情
    apiAnalystTableSearchDetail: {
        url: '/api/note/noteAnalyst/table/searchDetail',
        method: 'get'
    },
    // 数据图详情
    apiAnalystChartSearchDetail: {
        url: '/api/note/noteAnalyst/chart/searchDetail',
        method: 'get'
    }
}

export default searchApi;