import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Table, Button, Icon, Input } from 'antd';
import eventEmitter from '../../event';
import DataTableCard from 'abc-data-table-card';
import DataChartCard from 'abc-data-chart-card';

const SearchResultWrapper = styled.div`
    position: relative;
    padding-top: 40px;

    .search-tabs {
        position: relative;

        .icon-arrow {
            font-size: 22px;
            color: #b8b8b8;

            &:hover {
                color: #407CD5;
            }
        }

        .tabs-disabled {
            cursor: not-allowed;
            color: #ccc;
        }

        .tabs-prev {
            position: absolute;
            top: 12px;
            left: 0;
        }

        .tabs-next {
            position: absolute;
            top: 12px;
            right: 0;
        }
    }

    .search-tabs-header {
        margin: 0 20px;
        border-bottom: 1px solid #E9E9E9;
        overflow: hidden;

        li {
            display: inline-block;
            cursor: pointer;
            font-size: 14px;
            color: #999;
            padding: 17px 25px;
            border-bottom: 2px solid transparent;

            &.active,
            &:hover {
                color: #108EE9;
            }

            &.active {
                border-bottom-color: #108EE9;
            }
        }
    }

    .search-tabs-headbox {
        position: relative;

        ul {
            display: inline;
            word-break: keep-all;
            white-space: nowrap;
        }
    }

    .anticon-close {
        position: absolute;
        right: 6px;
        top: 16px;
        cursor: pointer;
    }

    .close{
        color: #bbb;
        float: right;
        margin-right: 20px;
        font-size: 16px;
        margin-top: 15px;
        cursor: pointer;
        &:hover{
            color: #666;
        }
    }

    .search-result-content {
        margin: 16px 20px;
        
        .table-panel-wrapper,
        .chart-panel-wrapper {
            position: relative;
            margin-bottom: 20px;
            overflow: hidden;

            .data-chart-card_pos-right,
            .pos-right {
                display: none !important;
            }

            .right {
                position: absolute;
                right: 13px;
                top: 13px;
                width: 55px;
                height: 24px;

                .insert-btn {
                    border-radius: 2px;
                    background-color: #287DDC;
                    font-size: 12px;
                    color: #fff;

                    &[disabled],
                    &[disabled]:hover {
                        color: rgba(0,0,0,.25);
                        background-color: #f5f5f5;
                        border-color: #d9d9d9;
                        text-shadow: none;
                    }
                }
            }
        }
        
        /* .table-panel-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;

            .left {
                h2 {
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 6px;
                }

                .date {
                    color: #9A9FA5;
                    font-size: 12px;
                }
            }

            
        }

        .table-panel-footer {
            margin-top: 15px;
            color: #97999C;
            font-size: 12px;

            p {
                margin-bottom: 8px;

                .link-a {
                    color: inherit;
                    text-decoration: underline;

                    &:hover {
                        color: #287DDC;
                    }
                }
            }
        }

        .ant-table {
            .ant-table-thead {
                tr > th {
                    background-color: #939cb3;
                    font-size: 12px;
                    color: #fff;
                }
            }

            .ant-table-thead > tr > th,
            .ant-table-tbody > tr > td {
                padding: 8px 15px;
            }

            .ant-table-tbody > tr {
                &:nth-child(even) {
                    background-color: #f7f8fa;
                }
            }
        } */
    }
    .temporary{
        text-align: center;
        font-size: 20px;
        color: #bebebe;
        margin-top: 100px;
    }

    .search-form {
        display: flex;
        padding: 0 20px;

        .ant-input {
            border-radius: 0;
        }

        .search-btn {
            background-color: #287DDC;
            color: #fff;
            margin-left: -1px;
            border-radius: 0;
            border: 1px solid transparent;
        }
    }
`;

@inject('drawerStore')
@inject('searchStore')
@observer
export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: 4,
            overflow: false,
            searchShow: false,
            transX: 0,
            disable: {
                prev: false,
                next: false
            },
            tabs: [
                {
                    name: '公告',
                    fetchMethod: ''
                },
                {
                    name: '研报',
                    fetchMethod: ''
                },
                {
                    name: '资讯',
                    fetchMethod: ''
                },
                {
                    name: '数据图',
                    fetchMethod: 'getAnalystChartSearch'
                },
                {
                    name: '数据表',
                    fetchMethod: 'getAnalystTableSearch'
                },
                {
                    name: '笔记',
                    fetchMethod: ''
                }
            ]
        }
    }

    componentDidMount() {
        this.setOverflow();
    }

    setOverflow() {
        if (this.refs.head.offsetWidth < this.refs.box.offsetWidth) {
            this.setState({
                overflow: true
            });

            this.setTransX(this.state.transX);
        }
    }

    setTransX(transX) {
        let disable = null;
        if (transX === 0) {
            disable = {
                prev: true,
                next: false
            };
        } else if (-transX == this.refs.box.offsetWidth - this.refs.head.offsetWidth) {
            disable = {
                prev: false,
                next: true
            }
        } else {
            disable = {
                prev: false,
                next: false
            }
        }

        this.setState({
            transX,
            disable
        })
    }

    // 设置transX
    setTranslate3d(that, index) {
        let thatLeft = that.offsetLeft + that.offsetWidth,
            headWidth = this.refs.head.offsetWidth,
            transX = Math.abs(this.state.transX);

        // 左超出
        if (transX > that.offsetLeft - 10) {
            transX = that.offsetWidth - thatLeft + (index == 0 ? 0 : that.previousSibling.offsetWidth)
        } else if (thatLeft - transX > headWidth - (that.nextSibling ? that.nextSibling.offsetWidth : 0)) {
            transX = headWidth - thatLeft - (this.state.tabs.length == index + 1 ? 0 : that.nextSibling.offsetWidth);
        } else {
            transX = -transX;
        }

        this.setTransX(transX);
    }

    switchTab = (index) => {
        this.setState({
            activeTabIndex: index
        }, () => {
            this.setTranslate3d(this.refs[`tab_${index}`], index);

            this.handleSearch();
        });

        // 点击回调
        this.props.clickBack ? this.props.clickBack(index) : null;
    }

    // 上一页,下一页
    prevAndNextClick(mark) {
        let transX = Math.abs(this.state.transX);
        if (mark == 'prev') {
            transX = transX - this.refs.head.offsetWidth;
            if (transX < 0) {
                transX = 0;
            }
        } else {
            transX = transX + this.refs.head.offsetWidth;
            if (this.refs.box.offsetWidth - transX < this.refs.head.offsetWidth) {
                transX = this.refs.box.offsetWidth - this.refs.head.offsetWidth;
            }
        }
        this.setTransX(-transX);
    }

    insertTable(e, index) {
        console.log('e: ', e);
        const parentNode = e.target.parentNode.parentNode;
        // 表格主体
        const tableMain = parentNode.querySelector('.single-tab-table-show').cloneNode(true);

        eventEmitter.emit('EDITOR_INSERT_TABLE_CODE', `
            <div class="DataTable-Container">
                <div class="tableListView">
                    <div class="single-tab single-tab-tableData">
                        ${ tableMain.outerHTML }
                    </div>
                </div>
            </div>
        `);
    }

    handleSearch = (e) => {
        e && e.preventDefault();

        const { activeTabIndex, tabs } = this.state;

        if(![3, 4].includes(activeTabIndex)) {
            alert('其它Tab接口尚未联调！');
            return;
        }
        this.props.searchStore[tabs[activeTabIndex].fetchMethod]({
            keyword: this.keyword,
            limit: 10,
            offset: 0
        });
        this.setState({searchShow: true});
    }

    handleInput = (e) => {
        const value = e.target.value;
        this.keyword = value;
    }

    // 插入图表或图片
    insertChartOrImg = (index) => {
        const { analystChart } = this.props.searchStore;
        const chartItem = analystChart.item[index];

        eventEmitter.emit('EDITOR_INSERT_CHART', JSON.parse(JSON.stringify(chartItem.chart_data.data)));
    }


    render() {
        const { activeTabIndex, tabs, overflow } = this.state;
        const { analystTable, analystChart, chartLoading } = this.props.searchStore;

        const style = { transform: `translate3d(${this.state.transX}px, 0, 0)` };
        return <SearchResultWrapper>
            <Icon type='close' onClick={() => { this.props.closeCallback() }}></Icon>
            <form className="search-form">
                <Input placeholder="输入关键词搜索" onChange={ this.handleInput } onPressEnter={ this.handleSearch }/>
                <Button className="search-btn" onClick={ this.handleSearch }>搜索</Button>
            </form>
            <div className="search-tabs">
                <a className={`tabs-prev${(this.state.disable.prev ? ' tabs-disabled' : '')}`} onClick={this.prevAndNextClick.bind(this, 'prev')}><i className="icon-arrow iconfont icon-abc-arrow-left"></i></a>
                <a className={`tabs-next${(this.state.disable.next ? ' tabs-disabled' : '')}`} onClick={this.prevAndNextClick.bind(this, 'next')}><i className="icon-arrow iconfont icon-abc-arrow-right"></i></a>
                <div className={`search-tabs-header ${overflow ? 'tabs-overflow' : ''}`} ref="head">
                    <div className="search-tabs-headbox" style={style}>
                        <ul ref="box">
                            {
                                tabs.map((tabItem, index) => {
                                    return <li ref={`tab_${index}`} key={index} onClick={this.switchTab.bind(this, index)} className={activeTabIndex === index ? 'active' : undefined}>{tabItem.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

            </div>

            <div className="search-result-content">
                {/* 数据图 */}
                {
                    (analystChart.item && !!analystChart.item.length && activeTabIndex === 3) && analystChart.item.map((item, index) => {
                        const data = {
                            id: item.id,
                            image_title: item.image_title,
                            time: item.time,
                            title: item.title,
                            type: item.type,
                            author: item.author,
                            chart_data: item.chart_data ? JSON.parse(JSON.stringify(item.chart_data.data || {})) : null,
                            image_url: item.image_url
                        }
                        return <div className="chart-panel-wrapper">
                            <DataChartCard
                                    data={ data }
                                    loading={ chartLoading }
                                    isBitPicture={ item.chart_data ? item.chart_data.is_bitmap : false}
                                    detailLink={`https://charttable.analyst.ai/chart/${ item.id || item.real_id}`}
                                    sourceLink={`https://report.analyst.ai/report/article/${ item.file_id}`}
                                    chartSize={{ height: 300, width: 350 }} />
                            <div className="right">
                                <Button type="primary" className="insert-btn" onClick={ this.insertChartOrImg.bind(this, index) }>插入</Button>
                            </div>
                        </div>
                    })
                    
                }

                {/* 数据表 */}
                {
                    (analystTable.items && !!analystTable.items.length && activeTabIndex === 4) && analystTable.items.map((item, index) => {
                        const data = {
                            table_data: item.table_data.data || [],
                            table_title: item.table_title,
                            time: item.time,
                            title: item.title,
                            type: item.type,
                            company: item.company
                        }

                        return <div className="table-panel-wrapper">
                            <DataTableCard keyword={ analystTable.keyword } data={ data } key={ index }
                                detailLink={`https://charttable.analyst.ai/table/${ item.id }`}
                                sourceLink={`https://report.analyst.ai/detail?srcId=${ item.src_id }&page=${ item.filePage }`}></DataTableCard>
                            <div className="right">
                                <Button type="primary" className="insert-btn" disabled={ (!data.table_data || !data.table_data.length) } onClick={ e => this.insertTable(e, index) }>插入</Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </SearchResultWrapper>
    }
}