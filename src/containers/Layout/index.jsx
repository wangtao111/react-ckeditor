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

    .react-resizable {
        position: relative;
    }

    .react-resizable-handle {
        position: absolute;
        width: 1px;
        height: 100%;
        cursor: col-resize;
    }
`;

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 200,
            height: 400,
        }
    }

    resizeBox = ((event, { element, size }) => {
        this.setState({ width: size.width });
    })

    // componentDidMount() {
    //     this.setState({
    //         height: window.document.documentElement.scrollHeight - 20
    //     })
    // }

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