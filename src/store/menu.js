import { observable, action } from "mobx";

export default class MenuStore {
    @observable selectedKey = '0,-1';       // 选中的菜单项key
    @observable goBackDisabled = true;     // 返回上一级默认按钮是可用的

    @action.bound
    setSelectedKey(selectedKey) {
        this.selectedKey = selectedKey;

        if(selectedKey && selectedKey.endsWith('2,-1') && selectedKey !== '2,-1') {
            // 是可以返回的
            this.goBackDisabled = false;
        }else {
            this.goBackDisabled = true;
        }
    }

    // 返回到上一级
    @action.bound
    goBackLevel() {
        if(this.goBackDisabled) return;

        const { selectedKey } = this;
        const keys = selectedKey.split(',');

        if(keys && keys.length) {
            keys.shift();

            this.setSelectedKey(keys.toString());
        }
    }
}