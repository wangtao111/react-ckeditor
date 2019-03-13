import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import IntelliCommand from '../intelliCommand';
import Preview from '../Preview';
import { inject, observer } from 'mobx-react';
import SearchResult from '../SearchResult';

const CommandPopupWrapper = styled.div`
    width: 360px;
`;

@inject('drawerStore')
@observer
export default class CommandPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    onClose = () => {
        this.props.drawerStore.setVisible(true);
        this.setState({visible: true});
        document.getElementById('standby').style.width = 0;
    }
    open = () => {
        this.props.drawerStore.setVisible(false);
        this.setState({visible: false});
        document.getElementById('standby').style.width = '360px';
    }

    render() {
        const { isVisible, setVisible, setCommandPopFlag } = this.props.drawerStore;
        const { visible } = this.state;
        return <CommandPopupWrapper>
            <Button
                icon='left-circle'
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: 0,
                    display: visible ? 'block' : 'none'
                }}
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
                <SearchResult></SearchResult>
            }
        </CommandPopupWrapper>
    }
}