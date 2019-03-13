import React from 'react';
import Header from '../Header';
import NavSection from '../NavSection';
import styled from 'styled-components';
import FileListSection from '../FileListSection';
import FinEditor from '../FinEditor';
import CommandPopup from '../../components/CommandPopup';
import { ResizableBox } from 'react-resizable';

const AppContent = styled.section`
    display: flex;

    .react-resizable {
        position: relative;
    }

    .react-resizable-handle {
        position: absolute;
        width: 1px;
        height: 100%;
        bottom: 0;
        right: 0;
        cursor: col-resize;
    }
`;

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 200,
            height: 800,
        }
    }

    render() {
        return <div>
            <Header></Header>
            <AppContent>
                <ResizableBox width={this.state.width} minConstraints={[260]} onResize={(event, { element, size }) => {
                    this.setState({ width: size.width, height: size.height });
                }}>
                    <NavSection />
                </ResizableBox>
                <FileListSection />
                <FinEditor />
                <div id='standby' style={{width: 0, boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.3)'}}>
                    <CommandPopup></CommandPopup>
                </div>
            </AppContent>
        </div>
    }
}