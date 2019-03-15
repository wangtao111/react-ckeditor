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
        flex-shrink: 0;
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
            width: 220,
            height: 800,
        }
    }

    render() {
        return <div>
            <Header></Header>
            <AppContent>
                <ResizableBox width={this.state.width} minConstraints={[220]} onResize={(event, { element, size }) => {
                    this.setState({ width: size.width, height: size.height });
                }}>
                    <NavSection />
                </ResizableBox>
                <FileListSection />
                <FinEditor />
                <CommandPopup></CommandPopup>
            </AppContent>
        </div>
    }
}