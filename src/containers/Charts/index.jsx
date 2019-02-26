import React from 'react';
import { StandardChart } from 'abc-standard-chart';

export default class ChartDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            test: '不变', // 测试
            datas: [{
                month: 'Jan',
                Tokyo: 7.0,
                London: 3.9
            }, {
                month: 'Feb',
                Tokyo: 6.9,
                London: 4.2
            }, {
                month: 'Mar',
                Tokyo: 9.5,
                London: 5.7
            }, {
                month: 'Apr',
                Tokyo: 14.5,
                London: 8.5
            }, {
                month: 'May',
                Tokyo: 16.4,
                London: 11.9
            }, {
                month: 'Jun',
                Tokyo: 21.5,
                London: 10.2
            }, {
                month: 'Jul',
                Tokyo: 25.2,
                London: 17.0
            }, {
                month: 'Aug',
                Tokyo: 26.5,
                London: 16.6
            }, {
                month: 'Sep',
                Tokyo: 23.3,
                London: 14.2
            }, {
                month: 'Oct',
                Tokyo: 18.3,
                London: 10.3
            }, {
                month: 'Nov',
                Tokyo: 13.9,
                London: 6.6
            }, {
                month: 'Dec',
                Tokyo: 9.6,
                London: 4.8
            }],

            seriesMapping:  [{title: '东京', chartType: 'column', xKey: 'month', yKey: 'Tokyo'},
                {title: '伦敦', chartType: 'column', xKey: 'month', yKey: 'London'}],
            customConfig: {
                title: {
                    text: '基本柱状图'
                },
                //plotOptions: {
                //    column: {
                //        stacking: 'percent',
                //        dataLabels: {
                //            enabled: true,
                //            format: '{point.percentage:.0f}%'
                //        }
                //    }
                //}
            }
        }
    }

    changeSetting = () => {
        this.setState({
            datas: [
                {month: 'Jan', Tokyo: 7.0, London: 3.9},
                {month: 'Feb', Tokyo: 1.9, London: 8.2}
            ],
            customConfig: {
                title: {
                    text: '堆积柱状图'
                },
                plotOptions: {
                    column: {
                        stacking: 'percent',
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.0f}%'
                        }
                    }
                }
            }
        });
    }

    render() {
        let { datas, seriesMapping, customConfig, test } = this.state;
        return (
            <div className="demo-column-chart">
                <StandardChart chartId='yyy' datas={datas} seriesMapping={seriesMapping}
                    customConfig={customConfig}/>
            </div>)
    }
}