import React from 'react';
import {Button, Icon} from 'antd';
import styled, { css } from 'styled-components';
import IntelliCommand from '../intelliCommand';
import Preview from '../Preview';
import { inject, observer } from 'mobx-react';
import SearchResult from '../SearchResult';

const CommandPopupWrapper = styled.div`
    width: 0;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);

    ${props => props.visible && css`
        display: block;
        width: 480px;
        #popup_btn {
            display: none;
        }
    `}
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
        this.props.drawerStore.setVisible(false);
        this.props.drawerStore.setFlagFalse();
    }

    render() {
        const { setCommandPopFlag, isVisible, setVisible } = this.props.drawerStore;
        
        return <CommandPopupWrapper visible={ isVisible }>
            <Button
                icon='left-circle'
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: 0,
                }}
                id='popup_btn'
                onClick={() => {  setVisible(true); setCommandPopFlag(); }}></Button>
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