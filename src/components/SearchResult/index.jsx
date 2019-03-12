import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Table, Button } from 'antd';
import eventEmitter from '../../event';

const SearchResultWrapper = styled.div`
    .search-tabs {
        margin-top: 40px;
        border-bottom: 1px solid #E9E9E9;

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
`;

@inject('drawerStore')
@observer
export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabIndex: 3
        }
    }

    switchTab(index) {
        this.setState({
            activeTabIndex: index
        })
    }

    insertTable(index) {
        eventEmitter.emit('EDITOR_INSERT_TABLE_CODE', document.getElementById(`report-${ index }`).parentNode.innerHTML);
    }

    render() {
        const tabs = [
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
                name: '数据图'
            },
            {
                name: '数据表'
            }
        ];

        const { activeTabIndex } = this.state;

        const { searchResult } = this.props.drawerStore;
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
        ]
        return <SearchResultWrapper>
            <div className="search-tabs">
                <ul>
                    {
                        tabs.map((tabItem, index) => {
                            return <li key={ index } onClick={ this.switchTab.bind(this, index) } className={ activeTabIndex === index ? 'active' : undefined}>{ tabItem.name }</li>
                        })
                    }
                </ul>
            </div>

            <div className="search-result-content">
                {
                    (searchResult && !!searchResult.length) && searchResult.map((searchItem, index) => {
                        return <div className="table-panel-wrapper">
                            <div className="table-panel-header">
                                <div className="left">
                                    <h2>{ searchItem.title }</h2>
                                    <span className="date">{ searchItem.date }</span>
                                </div>
                               
                                <div className="right">
                                    <Button type="primary" className="insert-btn" onClick={ this.insertTable.bind(this, index) }>插入</Button>
                                </div>
                            </div>

                            <Table
                                id={ `report-${ index }` }
                                bordered
                                columns={ columns }
                                dataSource={ searchItem.data } 
                                key={ index}
                                pagination={ false }></Table>

                            <div className="table-panel-footer">
                                <p>公司: { searchItem.company || '--'}</p>
                                <p>来源: <a className="link-a">{ searchItem.source || '--'}</a></p>
                                <p>类别: { searchItem.type || '--'}</p>
                            </div>

                        </div>
                    })
                }
                
            </div>
        </SearchResultWrapper>
    }
}