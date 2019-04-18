import { observable, action, flow } from "mobx";
import FileData from '../mockData/files';
import ajax from '../lib/ask';
import { message } from 'antd';

export default class NoteStore {
    @observable noteList = FileData;

    @observable noTitleNum = 0;     // 无标题笔记个数
    @observable activeIndex = 0;       //  当前激活的笔记下标
    @observable directoryList = [];     // 文件夹列表
    @observable isSaving = false;         // 保存中          

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
    
    // 更新笔记项
    @action.bound
    updateNoteItem(updatedNote) {
        this.noteList.splice(this.activeIndex, 1, updatedNote);
    } 

    // 新建一个新笔记
    @action.bound
    async addNewNote(params) {
        const { authorId, directoryId } = params;
        const requestBody = {
            articleTitle: `无标题笔记${ this.noTitleNum ? `(${this.noTitleNum + 1})` : ''}`,
            markWords: '',
            status: 1,
            checkStatus: 1,
            articleContent: '',
            ...params
        }

        await this.publishNote(requestBody);
        await this.getSubDirAndNotes({
            userId: authorId,
            dirId: directoryId,
            pageIndex: 0,
            pageSize: 10
        });
        this.noTitleNum++;
    }

    // 发布文档
    publishNote = flow(function*(requestBody) {
        try {
            this.isSaving = true;
            yield ajax('apiPublishNote', {
                data: requestBody
            });

            this.isSaving = false;
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '发布文档失败！');
        }
    })

    // 更新文档
    updateNote = flow(function*(requestBody) {
        try {
            this.isSaving = true;
            yield ajax('apiUpdateNote', {
                data: requestBody
            });

            this.isSaving = false;
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '更新文档失败！');
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
                this.setActiveIndex(0);

                let noTitleNum = 0;
                this.noteList.forEach(note => {
                    if(note.articleTitle.includes('无标题笔记')) {
                        noTitleNum++;
                    }
                });
                this.noTitleNum = noTitleNum;
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
                this.noteList = data.data || [];
                this.directoryList = [];
            }
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '全文搜索失败！');
        }
    })
}