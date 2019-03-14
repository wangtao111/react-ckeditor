import React from 'react';
import {Button, Icon} from 'antd';
import styled from 'styled-components';
import IntelliCommand from '../intelliCommand';
import Preview from '../Preview';
import { inject, observer } from 'mobx-react';
import SearchResult from '../SearchResult';

const CommandPopupWrapper = styled.div`
    width: 100%;
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
`;

@inject('drawerStore')
@observer
export default class CommandPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    onClose = () => {
        document.getElementById('standby').style.width = 0;
        document.getElementById('standby').style.overflow = 'hidden';
        document.getElementById('popup_btn').style.display = 'block';
    }
    open = () => {
        document.getElementById('standby').style.width = '360px';
        document.getElementById('standby').style.overflow = 'visible';
        document.getElementById('popup_btn').style.display = 'none';
    }

    render() {
        const {setCommandPopFlag } = this.props.drawerStore;
        return <CommandPopupWrapper>
            <Button
                icon='left-circle'
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: 0,
                }}
                id='popup_btn'
                onClick={() => {this.open();setCommandPopFlag();}}></Button>
            {
                this.props.drawerStore.isCommandPop && <React.Fragment>
                    {/* 智能命令 */}
                    <IntelliCommand closeCallback={this.onClose}/>
                    {/* 预览 */}
                    <Preview closeCallback={this.onClose}/>
                </React.Fragment>
            }

            {/* 搜索结果 */}
            {
                this.props.drawerStore.isSearchResult &&
                <SearchResult closeCallback={this.onClose}></SearchResult>
            }
        </CommandPopupWrapper>
    }
}