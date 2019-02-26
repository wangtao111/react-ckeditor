import React from 'react';
import { Drawer, Button, Table } from 'antd';
import ChartDemo from '../../containers/Charts';
import { inject, observer } from 'mobx-react';
import eventEmitter from '../../event';

@inject('editorStore')
@observer
export default class CommandPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true
        }

        this.editor = this.props.editorStore.editor;
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    }

    insertChart = () => {
        const chartId = 'chartDemoId';
        this.props.editorStore.setChartData({
            [chartId]: {
                title: {
                  text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
                },
                subtitle: {
                  text: '数据来源：thesolarfoundation.com'
                },
                yAxis: {
                  title: {
                    text: '就业人数'
                  }
                },
                legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'middle'
                },
                plotOptions: {
                  series: {
                    label: {
                      connectorAllowed: false
                    },
                    pointStart: 2010
                  }
                },
                series: [{
                  name: '安装，实施人员',
                  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                  name: '工人',
                  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                  name: '销售',
                  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                  name: '项目开发',
                  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                  name: '其他',
                  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],
                responsive: {
                  rules: [{
                    condition: {
                      maxWidth: 500
                    },
                    chartOptions: {
                      legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                      }
                    }
                  }]
                }
              }
        });
        
        eventEmitter.emit('EDITOR_INSERT_CHART', chartId);

        this.onClose();
    }

    // 插入表格
    insertTable() {
        const columns = [
            {
                title: '利润表',
                dataIndex: 'profit'
            },
            {
                title: '合并报表',
                dataIndex: 'merge1'
            },
            {
                title: '合并报表',
                dataIndex: 'merge2'
            }
        ];
        const dataSource = [
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            }
        ];

        eventEmitter.emit('EDITOR_INSERT_TABLE', {
          columns,
          dataSource
        });
    }

    render() {
        const columns = [
            {
                title: '利润表',
                dataIndex: 'profit'
            },
            {
                title: '合并报表',
                dataIndex: 'merge1'
            },
            {
                title: '合并报表',
                dataIndex: 'merge2'
            }
        ];
        const dataSource = [
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            }
        ]

        return <div className="command-popup">
            <Drawer
                width={ 500 }
                onClose={this.onClose}
                visible={this.state.visible}
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px',
                }}>
                  <ChartDemo />
                  <Table columns={ columns } dataSource={ dataSource } pagination={ null }></Table>
                  <Button type="primary" onClick={ this.insertChart }>插入图表</Button>
                  <Button type="primary" onClick={ this.insertTable }>插入表格</Button>
            </Drawer>
        </div>
    }
}