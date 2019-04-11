import React from 'react';
import styled, { css } from 'styled-components'
import { Table, Button } from 'antd';
import eventEmitter from '../../event';
import Highcharts from 'highcharts';
import { inject, observer } from 'mobx-react';

const PreviewWrapper = styled.div`
    overflow: hidden;
    font-size: 12px;
    background: #fff;
    h2 {
        font-size: 14px;
        color: #333;
        font-weight: normal;
        padding-left: 13px;
        padding-bottom: 11px;
        border-bottom: 1px solid #eee;
    }

    .data-show-type {
        border-bottom: 1px solid #eee;
        font-size: 0;
    }

    .drawer-btn-insert {
        float: right;
        width: 70px;
        height: 30px;
        margin-right: 18px;
        margin-top: 18px;
        border-radius: 4px;
        background-color: #417CD5;

        &:hover,
        &:focus {
            background-color: #417CD5;
        }

        &[disabled] {
            color: rgba(0,0,0,0.25);
            background-color: #f5f5f5;
            border-color: #d9d9d9;
        }
    }

    .table-show-wrapper {
        .table-caption {
            color: #333;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: normal;
        }

        .ant-table-thead > tr > th {
            background-color: #fff;
            color: #999;
            font-weight: normal;
        }

        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
            padding: 8px 12px;
            font-size: 12px;
        }
    }
   
`;

const Link = styled.a`
        display: inline-block;
        width: 18px;
        height: 19px;
        margin: 15px 0;
        margin-left: 20px;
        ${props => props.icon && css`
            background: url('${require(`../../theme/images/${ props.icon }${ props.selected ? '_selected' : ''}.png`)}') no-repeat scroll center / contain; 
        `}
`
@inject('editorStore')
@observer
export default class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,                   // 默认选择表格的展示方式
            selectedRowKeys: [],
            selectedType: '表格',                // 默认选择表格
            toBeInsertTableRows: [],            // 待插入的表格行数据
        };

        this.columns = [
            {
                title: '利润表',
                dataIndex: 'profit'
            },
            {
                title: '2018Q1',
                dataIndex: 'merge1'
            },
            {
                title: '2018Q2',
                dataIndex: 'merge2'
            }
        ];
        this.dataSource = [
            {
                key: 1,
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                key: 2,
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                key: 3,
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                key: 4,
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            },
            {
                key: 5,
                profit: '营业总收入',
                merge1: '234,43543,2300',
                merge2: '12,2132,1233'
            }
        ]
        this.chartOption = {
            title: {
                text: '就业人数统计'
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
            series: [
                {
                    name: '安装，实施人员',
                    data: [
                        43934,
                        52503,
                        57177,
                        69658,
                        97031,
                        119931,
                        137133,
                        154175
                    ]
                }, {
                    name: '工人',
                    data: [
                        24916,
                        24064,
                        29742,
                        29851,
                        32490,
                        30282,
                        38121,
                        40434
                    ]
                }, {
                    name: '销售',
                    data: [
                        11744,
                        17722,
                        16005,
                        19771,
                        20185,
                        24377,
                        32147,
                        39387
                    ]
                }
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                            maxHeight: 300
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }
                ]
            }
        };
        
        this.handleRowSelectChange = this.handleRowSelectChange.bind(this); 
        this.insertData = this.insertData.bind(this);
    }

    // 选择展示类型
    selectShowType(index, title) {
        this.setState({
            selectedIndex: index,
            selectedType: title !== '表格' ? '图表' : title
        })
    }

    handleRowSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys,
            toBeInsertTableRows: selectedRows
        });
    }

    // 插入表格或图表数据
    insertData() {
        const { selectedType } = this.state;

        switch(selectedType) {
            case '表格': {
                eventEmitter.emit('EDITOR_INSERT_TABLE', {
                    columns: this.columns,
                    dataSource: this.state.toBeInsertTableRows
                });
                // this.props.closeCallback && this.props.closeCallback();
                break;
            }
            case '图表': {
                const chartId = this.props.chartId;

                this.props.editorStore.setChartData({
                    [chartId]: this.chartOption
                });
                eventEmitter.emit('EDITOR_INSERT_CHART', chartId);
                // this.props.closeCallback && this.props.closeCallback();
                break;
            }

            default: break;
        }
    }

    componentDidMount() {
        Highcharts.chart(this.props.chartId, this.chartOption);
    }

    render() {
        // 数据展示形式
        const dataShowTypes = [
            {
                title: '表格',
                icon: 'icon_table',
            },
            {
                title: '折线图',
                icon: 'icon_line_chart'
            },
            // {
            //     title: '柱状图',
            //     icon: 'icon_bar_chart'
            // },
            // {
            //     title: '梯形图',
            //     icon: 'icon_step_line_chart'
            // },
            // {
            //     title: '堆积图',
            //     icon: 'icon_stack_chart'
            // }
        ]
        
        const { selectedIndex, selectedRowKeys, selectedType, toBeInsertTableRows } = this.state;
        const { chartId } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange
        }

        return <PreviewWrapper>
            <div className="data-show-type">
                {
                    dataShowTypes.map((showType, index) => {
                        return <Link 
                                    title={ showType.title }
                                    key={ index }
                                    icon={ showType.icon }
                                    selected={ selectedIndex === index }
                                    onClick={ () => this.selectShowType(index, showType.title) }></Link>
                    })
                }
            </div>

            {/* 表格展示数据 */}
            <div className="table-show-wrapper" style={ { display: selectedType === '表格' ? 'block' : 'none'} }>
                <h3 className="table-caption">中国平安（601318）2018年利润表</h3>
                <Table 
                    bordered
                    rowSelection={ rowSelection }
                    columns={ this.columns }
                    dataSource={ this.dataSource }
                    pagination={ false }></Table>
            </div>

            {/* 图表展示数据 */}
            <div className="chart-show-wrapper" style={ { display: selectedType === '图表' ? 'block' : 'none'} }>
                <div id={chartId}></div>
            </div>
            <Button type="primary" className="drawer-btn-insert" onClick={ this.insertData } disabled={ !toBeInsertTableRows.length && selectedType === '表格' }>插入</Button>
        </PreviewWrapper>
    }
}