import { observable, action } from "mobx";

export default class MenuStore {
    @observable selectedKey = '';       // 此用于文件列表中返回上一级
    @observable goBackDisabled = false;     // 返回上一级默认按钮是可用的

    @action.bound
    setSelectedKey(selectedKey) {
        this.selectedKey = selectedKey;

        if(selectedKey && selectedKey.endsWith('2,-1')) {
            // 是可以返回的
            this.goBackDisabled = false;
        }else {
            this.goBackDisabled = true;
        }
    }

    // 返回到上一级
    @action.bound
    goBackLevel() {
        const { selectedKey } = this;

        selectedKey.replace(/^(\d,)+\-1$/, '$\'')
    }
}