import React from 'react';
import Header from '../Header';
import NavSection from '../NavSection';
import styled from 'styled-components';
import FileListSection from '../FileListSection';
import FinEditor from '../FinEditor';
// import ChartDemo from '../Charts';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const AppContent = styled.section`
    display: flex;
    height: calc(100vh - 50px);
`;

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 300,
            height: 400,
        }
    }

    render() {
        return <div>
            <Header></Header>
            {/* <ChartDemo /> */}
            <AppContent>
                <ResizableBox width={this.state.width} height={this.state.height} minConstraints={[260, 200]} maxConstraints={[400, 400]} onResize={(event, { element, size }) => {
                    this.setState({ width: size.width, height: size.height });
                }}>
                    <NavSection />
                </ResizableBox>
                <FileListSection />
                <FinEditor />
            </AppContent>
        </div>
    }
}