/**
 * store中心
 * @description 总 store 分配中心
 * @author dhhuang1
 * @date 2018/5/8 上午9:17:14
 */

import { configure } from 'mobx'
import DefaultStore from './default';
import EditorStore from './editor';
import NoteStore from './note';
import DrawerStore from './drawer';

// 只允许 内部改变 state
configure({ enforceActions: true })

class Store {
    constructor() {
        this.defaultStore = new DefaultStore(this)
        this.editorStore = new EditorStore(this);
        this.noteStore = new NoteStore(this);
        this.drawerStore = new DrawerStore(this);
    }
}


export default Store