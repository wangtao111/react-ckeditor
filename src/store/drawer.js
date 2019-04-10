import { observable, action } from "mobx";

class DrawerStore {
    @observable isVisible = false;     // 是否显示弹窗
    @observable commandContent = '';        // 命令内容
    @observable isSearchResult = false;        // 是搜索结果
    @observable isCommandPop = false;         // 是命令弹窗
    @observable isComponentWidgets = false;     // 是组件widget
    @observable searchResult = [
        {
            title: '2017年前五大智能手机厂商—出货量、市场份额',
            date: '2018/04/22',
            company: '小米集团',
            source: '总体稳中有降、分化明显、工程机械最亮眼',
            type: '行业深度',
            data: [
                {
                    firm: 'OPPO',
                    shipment: '78.4',
                    market: 16.8,
                },
                {
                    firm: '华为',
                    shipment: '78.4',
                    market: 16.8,
                },
                {
                    firm: '小米',
                    shipment: '78.4',
                    market: 16.8,
                }
            ]
        },
        {
            title: '小米手机业务近三年产能、产销率情况',
            date: '2018/03/08',
            company: '小米集团',
            source: '广发证券-电子行业周报',
            type: '行业深度',
            data: [
                {
                    firm: 'OPPO',
                    shipment: '78.4',
                    market: 16.8,
                },
                {
                    firm: 'OPPO',
                    shipment: '78.4',
                    market: 16.8,
                },
                {
                    firm: 'OPPO',
                    shipment: '78.4',
                    market: 16.8,
                }
            ]
        }
    ];          // 搜索结果

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