import React from 'react';
import {Drawer, Button} from 'antd';
import styled from 'styled-components';
import IntelliCommand from '../intelliCommand';
import Preview from '../Preview';

const CommandPopupWrapper = styled.div `
    width: 360px;
`;

export default class CommandPopup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    onClose = () => {
        this.setState({visible: false});
    }

    render() {
        return <CommandPopupWrapper>
            <Button
                icon='left-circle'
                style={{
                    position: 'fixed',
                    top: '50%',
                    right: 0
                }}
                onClick={() => {
                    this.setState({visible: true});
                }}></Button>
            <Drawer
                width={380}
                onClose={this.onClose}
                visible={this.state.visible}
                destroyOnClose={ true }
                className="side-drawer-popup"
                style={{
                    overflow: 'auto',
                    height: 'calc(100% - 108px)',
                    paddingBottom: '108px'
                }}>
                {/* 智能命令 */}
                <IntelliCommand/> {/* 预览 */}
                <Preview closeCallback={this.onClose}/>
            </Drawer>
        </CommandPopupWrapper>
    }
}