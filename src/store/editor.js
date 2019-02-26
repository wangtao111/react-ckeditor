import { observable, action } from "mobx";

class EditorStore {
    @observable editor = '';    
    @observable chartDataObj = {};

    @action.bound
    setEditor(editor) {
        this.editor = editor;
    }

    @action.bound
    setChartData(chartData) {
        Object.assign(this.chartDataObj, chartData);
    }
}

export default EditorStore;