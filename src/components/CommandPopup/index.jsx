import React from 'react';
import {Drawer, Button, Table} from 'antd';
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
    }

    onClose = () => {
        this.setState({visible: false});
        this.props.drawerStore.setVisible(false);
    }

    render() {
        const { isVisible, setVisible, setCommandPopFlag } = this.props.drawerStore;

        return <CommandPopupWrapper>
            <Button
                icon='left-circle'
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: 0
                }}
                onClick={() => {
                    setVisible(true);
                    setCommandPopFlag();
                }}></Button>
            <Drawer
                width={this.props.drawerStore.isSearchResult ? 500 : 380}
                onClose={this.onClose}
                visible={ isVisible }
                destroyOnClose={ true }
                className="side-drawer-popup"
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px'
                }}>
                {
                    this.props.drawerStore.isCommandPop && <React.Fragment>
                        {/* 智能命令 */}
                        <IntelliCommand/>
                        {/* 预览 */}
                        <Preview closeCallback={this.onClose}/>
                    </React.Fragment>
                }

                {/* 搜索结果 */}
                {
                    this.props.drawerStore.isSearchResult &&  
                    <SearchResult></SearchResult>
                }
               
            </Drawer>
        </CommandPopupWrapper>
    }
}