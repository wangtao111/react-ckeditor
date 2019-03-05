import { observable, action } from "mobx";

export default class NoteStore {
    @observable noteList = [
        {
            title: '《看研报》产品分析报告',
            briefContent: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
            content: '测试内容1',
            date: '2018-09-03',
            size: '7.1MB',
            imgUrl: ''
        },
        {
            title: '《看研报》产品分析报告',
            briefContent: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
            content: '测试内容2',
            date: '2018-09-03',
            size: '7.1MB',
            imgUrl: ''
        },
        {
            title: '《看研报》产品分析报告',
            briefContent: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
            content: '测试内容3',
            date: '2018-09-03',
            size: '7.1MB',
            imgUrl: ''
        }
    ];

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
}