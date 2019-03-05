import { observable, action } from "mobx";
import FileData from '../mockData/files';

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
}