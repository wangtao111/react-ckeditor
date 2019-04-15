import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Table, Button, Icon, Input } from 'antd';
import eventEmitter from '../../event';
import DataTableCard from 'abc-data-table-card';

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
        
        .table-panel-wrapper {
            border: 1px solid #E1E2E6;
            padding: 20px;
            margin-bottom: 20px;
        }
        
        .table-panel-header {
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

            .right {
                flex-basis: 55px;

                .insert-btn {
                    border-radius: 2px;
                    background-color: #287DDC;
                    font-size: 12px;
                    color: #fff;
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
        }
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
            activeTabIndex: 3,
            overflow: false,
            searchShow: false,
            transX: 0,
            disable: {
                prev: false,
                next: false
            },
            tabs: [
                {
                    name: '公告'
                },
                {
                    name: '研报'
                },
                {
                    name: '资讯'
                },
                {
                    name: '数据表'
                },
                {
                    name: '数据图'
                },
                {
                    name: '笔记'
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
            this.setTranslate3d(this.refs[`tab_${index}`], index)
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

    insertTable(index) {
        eventEmitter.emit('EDITOR_INSERT_TABLE_CODE', document.getElementById(`report-${index}`).parentNode.innerHTML);
    }

    handleSearch = () => {
        this.props.searchStore.getAnalystTableSearch({
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

    render() {
        const { activeTabIndex, tabs, overflow, searchShow } = this.state;
        const { searchResult } = this.props.drawerStore;
        const { analystTable } = this.props.searchStore;
        const columns = [
            {
                title: '厂商',
                dataIndex: 'firm'
            },
            {
                title: '2016出货量',
                dataIndex: 'shipment'
            },
            {
                title: '2016年市场份额',
                dataIndex: 'market'
            }
        ];

        const style = { transform: `translate3d(${this.state.transX}px, 0, 0)` };
        return <SearchResultWrapper>
            <Icon type='close' onClick={() => { this.props.closeCallback() }}></Icon>
            <form className="search-form">
                <Input placeholder="输入关键词搜索" onChange={this.handleInput}/>
                <Button className="search-btn" onClick={this.handleSearch}>搜索</Button>
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
            {
                searchShow ? <div className="search-result-content">
                    {
                        (searchResult && !!searchResult.length) && searchResult.map((searchItem, index) => {
                            return <div className="table-panel-wrapper">
                                <div className="table-panel-header">
                                    <div className="left">
                                        <h2>{searchItem.title}</h2>
                                        <span className="date">{searchItem.date}</span>
                                    </div>

                                    <div className="right">
                                        <Button type="primary" className="insert-btn" onClick={this.insertTable.bind(this, index)}>插入</Button>
                                    </div>
                                </div>

                                <Table
                                    id={`report-${index}`}
                                    bordered
                                    columns={columns}
                                    dataSource={searchItem.data}
                                    key={index}
                                    pagination={false}></Table>

                                <div className="table-panel-footer">
                                    <p>公司: {searchItem.company || '--'}</p>
                                    <p>来源: <a className="link-a">{searchItem.source || '--'}</a></p>
                                    <p>类别: {searchItem.type || '--'}</p>
                                </div>

                            </div>
                        })
                    }

                    {/* {
                    (analystTable.items && !!analystTable.items.length) && analystTable.items.map((item, index) => {
                        return <DataTableCard keyword={ analystTable.keyword }></DataTableCard>
                    })
                } */}

                </div> :
                <div class="temporary">暂无数据</div>
            }
        </SearchResultWrapper>
    }
}