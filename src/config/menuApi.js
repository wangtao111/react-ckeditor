/*
 * @Description: 左侧菜单的API
 * @Company: ABC
 * @Author: lfzhu
 * @LastEditors: lfzhu
 * @Date: 2019-04-03 09:33:45
 * @LastEditTime: 2019-04-04 10:02:27
 */


const menuApi = {
    // 新增文件夹
    apiCreateFileFolder: {
        method: 'post',
        url: '/api/note/fianceNote/putMyDirList'
    },
    // 更新文件夹
    apiUpdateFileFolder: {
        method: 'post',
        url: '/api/note/fianceNote/updateMyDir'
    },
    // 获取用户文件夹列表
    apiFetchFileFolderList: {
        method: 'get',
        url: '/api/note/fianceNote/getMyDirList'
    },
    // 将文件夹加入回收站
    apiPutDirToBin: {
        method: 'get'
    },
    // 文件夹从回收站收回
    apiRestoreDirFromBin: {
        method: 'get'
    }
}

export default menuApi;