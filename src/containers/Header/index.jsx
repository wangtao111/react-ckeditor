import React from 'react';
import { Radio, Input, message } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const AppHeader = styled.header`
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #407CD5;

    h1 {
        display: inline-block;
        color: inherit;
        font-size: 19px;
        padding-left: 53px;
        font-weight: normal;
    }

    h1,
    .operation-mode {
        vertical-align: middle;
    }

    .operation-mode {
        display: inline-block;
        margin-left: 45px;

        .ant-radio-button-wrapper {
            width: 60px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            padding: 0 5px;
            color: rgba(255, 255, 255, 1);
            border-color: transparent;
            background-color: #5391ED;
            opacity: 0.8;

            &:first-child {
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
            }

            &:last-child {
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
            }

            &:not(:first-child)::before {
                display: none;
            }

            &.selected {
                border: 1px solid #2059AE;
                background-color: #2B60AF;
                opacity: 1;
            }
        }

        .mode-icon {
            display: inline-block;
            width: 16px;
            height: 12px;
            margin-right: 4px; 
            vertical-align: -1px;
        }

        .icon-normal {
            background: url('${require('../../theme/images/icon_normal_mode.png')}') no-repeat scroll center center / contain;
        }

        .icon-edit {
            background: url('${require('../../theme/images/icon_edit_mode.png')}') no-repeat scroll center center / contain;
        }
    }

    .search-box {
        float: right;
        margin-right: 130px;
        width: 220px;

        &:after {
            display: block;
            content: '';
            clear: both;
        }

        .search-ipt {
            .ant-input {
                border-radius: 22px;
                font-size: 12px;
                height: auto;
            }
        }
        .icon-search {
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url('${require('../../theme/images/icon_search.png')}') no-repeat scroll 0 0 / contain;
        }
    }
`
@inject('drawerStore')
@observer
export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMode: 'edit'
        }
    }

    handleChange = (e) => {
        this.setState({
            activeMode: e.target.value
        })
    }

    search = (e) => {
        const value = e.target.value;
        
        if(!value || value.trim() === '') {
            message.error('请输入搜索内容！');
            return;
        }
        // 打开弹窗，设置标志
        this.props.drawerStore.setVisible(true);
        this.props.drawerStore.setSearchResultFlag();
    }

    render() {
        const { activeMode } = this.state;

        return <AppHeader id="header">
            <h1>金融云笔记</h1>
            <div className="operation-mode">
                <Radio.Group defaultValue={ activeMode } buttonStyle="solid" onChange={ this.handleChange }>
                    <Radio.Button 
                        value="normal" 
                        className={  activeMode === 'normal' ? 'selected' : undefined}>
                        <i className="icon-normal mode-icon"></i>普通
                    </Radio.Button>
                    <Radio.Button 
                        value="edit" 
                        className={  activeMode === 'edit' ? 'selected' : undefined}>
                        <i className="icon-edit mode-icon"></i>编辑
                    </Radio.Button>
                </Radio.Group>
            </div>

            <div className="search-box">
                <Input prefix={<i className="icon-search"></i>} placeholder="搜索..." className="search-ipt" onPressEnter={ this.search }/>
            </div>
        </AppHeader>
    }
}