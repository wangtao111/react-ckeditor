import { observable, action, flow } from "mobx";
import FileData from '../mockData/files';
import ajax from '../lib/ask';
import { message } from 'antd';

export default class NoteStore {
    @observable noteList = FileData;

    @observable noTitleNum = 0;     // 无标题笔记个数
    @observable activeIndex = 0;       //  当前激活的笔记下标


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
    
}