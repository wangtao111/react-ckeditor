import { observable, action } from "mobx";

class DrawerStore {
    @observable isVisible = false;     // 是否显示弹窗
    @observable commandContent = '';        // 命令内容
    @observable isSearchResult = false;        // 是搜索结果
    @observable isCommandPop = false;         // 是命令弹窗
    @observable isComponentWidgets = false;     // 是组件widget

    @action.bound
    setVisible(visible) {
        this.isVisible = visible;
    }

    @action.bound
    setSearchResultFlag() {
        this.isSearchResult = true;
        this.isCommandPop = false;
        this.isComponentWidgets = false;
    }

    @action.bound
    setCommandPopFlag() {
        this.isCommandPop = true;
        this.isSearchResult = false;
        this.isComponentWidgets = false;
    }

    @action.bound 
    setComponentWidget(flag) {
        this.isComponentWidgets = flag;
        this.isCommandPop = false;
        this.isSearchResult = false;
    }

    @action.bound
    setFlagFalse() {
        this.isCommandPop = false;
        this.isSearchResult = false;
        this.isComponentWidgets = false;
    }

}

export default DrawerStore;