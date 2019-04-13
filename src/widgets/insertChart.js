export default function(widgetNum, editor, setClickCallback, command) {
    // 加载highchart.js，并在回调中处理画图表
    // this.last
    editor.document.getWindow().$.clickCallback = setClickCallback;
    editor.widgets.add(`insertchart-widget${ widgetNum }`, {
        template: `<div class="chartContainer">
        <i class="setting iconfont icon-abc-setting" title="设置图表" onclick="clickCallback()"></i>
        <div id="chartContainer${ widgetNum }"></div>
        <p name='command' style='width:0;height:0;overflow:hidden;position: absolute;'>${command}</p>
        <img class="editCommand" name='editCommand' src="${require('../img/edit.png')}" title="编辑命令"/>
        <span class="resize" id="resizer"><span>
        </div>`,
        requireContent: 'div(chartContainer)',
        upcast: function(element) {
            return element.name === 'div' && element.hasClass('chartContainer')
        },
        data() {
            // 当数据变化时，再画chart，或擦了重画
            const { chartOption } = this.data;
            
            if(chartOption) {
                let chart = null;
                setTimeout(() => {
                    window.CKEDITOR.scriptLoader.load('https://cdn.bootcss.com/highcharts/7.1.0/highcharts.js', () => {
                        chart = window.Highcharts.chart(this.editor.document.getById(`chartContainer${ widgetNum }`).$, chartOption);
                        editor.focus();
                        const range = editor.getSelection().getRanges()[0];
                        range.collapse(false);
                    });
                }, 0);

                const chartContainer = this.element;
                let relativeTop = 0;
                let relativeLeft = 0;

                if(chartContainer) {
                    const { left, top } = chartContainer.$.getBoundingClientRect();
                    relativeTop = top;
                    relativeLeft = left;
                }

                function resize (event) {
                    const { x, y } = event.data.$;
                    chartContainer.setStyle('width', x - relativeLeft + 'px');
                    chartContainer.setStyle('height', y - relativeTop + 'px');

                    if(chart) {
                        chart.setSize(x - relativeLeft, y - relativeTop);
                    }
                }

                const resizer = chartContainer.findOne('#resizer')

                if(resizer) {
                    chartContainer.findOne('#resizer').on('mousedown', function() {
                        editor.document.on('mousemove', resize);
    
                        editor.document.on('mouseup', function() {
                            this.removeListener('mousemove', resize);
                        })
                    });
                }
            }
        }
    });

   
}