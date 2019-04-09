/*
 * @Description: 左侧菜单的API
 * @Company: ABC
 * @Author: lfzhu
 * @LastEditors: lfzhu
 * @Date: 2019-04-03 09:33:45
 * @LastEditTime: 2019-04-09 11:40:30
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
    },
    // 获取最新修改的笔记列表
    apiGetRecentNoteList: {
        method: 'get'
    },
    // 根据文件夹ID获取文件夹信息
    apiGetDirInfoById: {
        method: 'get'
    },
    // 获取用户文件夹下子文件夹和笔记列表
    apiGetSubDirAndNotes: {
        method: 'get'
    }
}

export default menuApi;