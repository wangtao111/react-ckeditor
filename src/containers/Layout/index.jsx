import React from 'react';
import Header from '../Header';
import NavSection from '../NavSection';
import styled from 'styled-components';
import FileListSection from '../FileListSection';
import FinEditor from '../FinEditor';
import ChartDemo from '../Charts';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const AppContent = styled.section`
    display: flex;
`;

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header></Header>
            {/* <ChartDemo /> */}
            <AppContent>
                <ResizableBox width={220} minConstraints={[100, 100]} maxConstraints={[300, 300]}>
                    <NavSection />
                </ResizableBox>
                
                <ResizableBox width={360} minConstraints={[100, 100]} maxConstraints={[400, 300]}>
                    <FileListSection />
                </ResizableBox>

                <ResizableBox maxConstraints={[300, 300]}>
                    <FinEditor />
                </ResizableBox>

            </AppContent>
        </div>
    }
}