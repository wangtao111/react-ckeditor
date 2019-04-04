/*
 * @Description: 文档笔记API
 * @Company: ABC
 * @Author: lfzhu
 * @LastEditors: lfzhu
 * @Date: 2019-04-03 09:55:14
 * @LastEditTime: 2019-04-04 10:05:26
 */

const noteApi = {
    // 更新文档笔记
    apiUpdateNote: {
        method: 'POST',
        url: '/api/note/fianceNote/updateNote'
    },
    // 删除笔记(放回文件夹)
    apiRemoveNote: {
        method: 'GET',
        url: '/api/note/fianceNote/putNoteInCrash'
    },
    // 删除笔记(物理删除)
    apiDeleteNote: {
        method: 'GET',
        url: '/api/note/fianceNote/deleteNotes'
    },
    // 获取用户文件夹下笔记列表
    apiGetDirNoteList: {
        method: 'get',
    },
    // 获取最新修改的笔记列表
    apiRecentNoteList: {
        method: 'get'
    }
}

export default noteApi;