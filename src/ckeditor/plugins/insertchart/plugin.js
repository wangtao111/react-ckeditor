CKEDITOR.plugins.add('insertchart', {
    requires: 'widget',
    init(editor) {
        editor.widgets.add('insertchart', {
            template: '<div id="chartWrapper" class="container"><div id="chartContainer"></div></div>',
            requireContent: 'div(container)',
            upcast: function(element) {
                return element.name === 'div' && element.hasClass('container')
            },
            data() {
                // 当数据变化时，再画chart，或擦了重画
                const { chartOption } = this.data;
                if(chartOption) {
                    setTimeout(() => {
                        Highcharts.chart(this.editor.document.getById('chartContainer').$, chartOption);
                    }, 0)
                }
            }
        });
    },
    afterInit: function() {
        // 加载highchart.js，并在回调中处理画图表
        CKEDITOR.scriptLoader.load('https://code.highcharts.com/highcharts.js');
    }
});