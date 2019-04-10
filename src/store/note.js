import { observable, action, flow } from "mobx";
import FileData from '../mockData/files';
import ajax from '../lib/ask';
import { message } from 'antd';

export default class NoteStore {
    @observable noteList = FileData;

    @observable noTitleNum = 0;     // 无标题笔记个数
    @observable activeIndex = 0;       //  当前激活的笔记下标
    @observable directoryList = [];     // 文件夹列表

    // 设置激活笔记下标
    @action.bound
    setActiveIndex(index) {
        this.activeIndex = index;
    }
    
    // 设置笔记列表
    @action.bound
    setNoteList(noteList) {
        this.noteList = noteList;
    }

    // 增加笔记
    @action.bound
    addNote(noteItem) {
        this.noTitleNum++;
        this.noteList.splice(0, 0, noteItem);
    }
    // 删除笔记
    @action.bound
    deleteNote(index) {
        this.noteList.splice(index, 1);
    }

    // 发布文档
    publishNote = flow(function*(params) {
        try {
            yield ajax('apiPublishNote')
        }catch(err) {

        }
    })

    // 更新文档
    updateNote = flow(function*(params) {
        try {
            yield ajax('apiUpdateNote');
        }catch(err) {

        }
    })

    // 最新文档笔记列表
    getRecentNoteList = flow(function* (params) {
        try {
            const { userId, ...restParams } = params;

            const data = yield ajax('apiGetRecentNoteList', { 
                params: restParams,
                url: `/api/note/fianceNote/getNewNotes/${ userId }`
            });

            this.noteList = data.list;
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '最新文档笔记列表！');
        }
    })
    
    // 获取回收站中的文件夹及笔记列表
    getBinDirAndNoteList = flow(function*(params) {
        try {
            const data = yield ajax('apiGetDirAndNotesInCrash', {
                url: `/api/note/fianceNote/getNoteAndDirInCrash/${ params.userId }`
            });
            
            if(data) {
                const { directoryModelList, financeNoteModelList } = data;

                this.directoryList = directoryModelList;
                this.noteList = financeNoteModelList;
            }
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取回收站的文件夹失败！');
        }
    })

    // 获取子文件夹和笔记列表
    getSubDirAndNotes = flow(function* (params) {
        try {
            const { userId, dirId, ...restParams } = params;

            const data = yield ajax('apiGetSubDirAndNotes', {
                url: `/api/note/fianceNote/getNotesOfDir/${ userId }/${ dirId }`,
                params: restParams
            });

            if(data) {
                const { financeNoteModelList, directoryModelList} = data;

                this.directoryList = directoryModelList.filter(item => item.status !== -1);
                this.noteList = financeNoteModelList;
            }
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取子文件夹和笔记列表失败！');
        }
    })

    // 全文搜索
    getNotesBySearchKey = flow(function* (params) {
        try {
            const data = yield ajax('apiGetNotesByKeyword', {
                params
            });

            if(data) {
                this.noteList = data.data;
                this.directoryList = [];
            }
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '全文搜索失败！');
        }
    })
}