import { observable, action, flow, observe } from "mobx";
import ajax from '../lib/ask';
import { message } from 'antd';

export default class MenuStore {
    @observable selectedKey = '0,-1';       // 选中的菜单项key
    @observable goBackDisabled = true;     // 返回上一级默认按钮是可用的
    @observable fileFolderList = [];       // 文件夹列表
    @observable loading = false;           // 加载中...

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
    
    // 创建文件夹
    createFileFolder = flow(function* (params) {
        try {
            yield ajax('apiCreateFileFolder', { data: params });
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '创建文件夹失败！');
        }
    });

    // 更新文件夹
    updateFileFolder = flow(function* (data, updateParams) {
        this.loading = true;
        try {
            yield ajax('apiUpdateFileFolder', { data });
            this.loading = false;
            
            const { indexes, updateKey, updateValue } = updateParams;
            const { fileFolderList } = this;

            let i = 0;
            let item = fileFolderList;
            while(i !== indexes.length) {
                item = item[i];
                i++;
            }

            item[updateKey] = updateValue;
        }catch(err) {
            this.loading = false;
            console.log('err: ', err);
            message.error(err || '更新文件夹失败！');
        }
    })

    // 删除文件夹
    removeFileFolder = flow(function* (directoryId) {
        try {
            yield ajax('apiPutDirToBin', { url: `/api/note/fianceNote/putMyDirInCrash/${ directoryId }` });
        }catch(err) {
            console.log('err: ', err);
            message.error(err || '删除文件夹失败！');
        }
    })

    // 获取文件夹列表
    getFileFolderList = flow(function* (params) {
        try {
            const data = yield ajax('apiFetchFileFolderList', { params });

            console.log('data: ', data);
            if(data) {

                this.fileFolderList = data.map(item => {
                    const { directoryName, ...rest } = item;

                    return {
                        name: directoryName,
                        expandable: true,
                        contextMenu: true,
                        ...rest
                    }
                });
            }

        }catch(err) {
            console.log('err: ', err);
            message.error(err || '获取文件夹列表失败！');
        }
    })
}