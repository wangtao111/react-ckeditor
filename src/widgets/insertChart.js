export default function(widgetNum, editor) {
    // 加载highchart.js，并在回调中处理画图表
    editor.widgets.add(`insertchart-widget${ widgetNum }`, {
        template: `<div id="chartWrapper" class="container"><div id="chartContainer${ widgetNum }"></div></div>`,
        requireContent: 'div(container)',
        upcast: function(element) {
            return element.name === 'div' && element.hasClass('container')
        },
        data() {
            // 当数据变化时，再画chart，或擦了重画
            const { chartOption } = this.data;
            if(chartOption) {
                setTimeout(() => {
                    window.CKEDITOR.scriptLoader.load('https://code.highcharts.com/highcharts.js', () => {
                        window.Highcharts.chart(this.editor.document.getById(`chartContainer${ widgetNum }`).$, chartOption);
                        editor.focus();
                        const range = editor.getSelection().getRanges()[0];
                        range.collapse(false);
                    });
                }, 0)
            }
        }
    });

   
}