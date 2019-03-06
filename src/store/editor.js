import { observable, action } from "mobx";

class EditorStore {
    @observable editor = '';    
    @observable chartDataObj = {};
    @observable tableDataList = [];

    @action.bound
    setEditor(editor) {
        this.editor = editor;
    }

    @action.bound
    setChartData(chartData) {
        Object.assign(this.chartDataObj, chartData);
    }

    // 待插入的表格数据
    @action.bound
    setTableData() {
        
    }
}

export default EditorStore;