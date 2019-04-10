import React from 'react';
import Header from '../Header';
import NavSection from '../NavSection';
import styled from 'styled-components';
import FileListSection from '../FileListSection';
import FinEditor from '../FinEditor';
import CommandPopup from '../../components/CommandPopup';
import { ResizableBox } from 'react-resizable';
import { inject, observer } from 'mobx-react';
import { Modal, Input } from 'antd';

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

    .aside-tools {
        width: 40px;
        text-align: center;
        background-color: #F2F2F2;
        line-height: 30px;
        margin-top: 14px;
    }

    .aside-icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #fff;
        border-radius: 50%;
        background-position: center;
        background-size: 18px;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .wise-search {
        background-color: #87C0F3;
        background-image: url('${require('../../theme/images/icon-side-search.png')}');
    }

    .wise-command {
        background-color: #C27FD9;
        background-image: url('${require('../../theme/images/icon-side-cmd.png')}');
    }

    .component-list {
        background-color: #8BC780;
        background-image: url('${require('../../theme/images/icon-side-list.png')}');
    }

    .other-setting {
        background-color: #F0C282;
        background-image: url('${require('../../theme/images/icon-side-setting.png')}');
    }
`;

@inject('drawerStore')
@observer
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 220,
            height: 800,
            isCollapsed: true,
            layoutSettingVisible: false
        }
    }

    changeWidth = (width) => {
        this.setState({
            width
        });
    }

    setCollapsed = () => {
        this.setState({
            isCollapsed: true
        })
    }

    // 触发智能搜索弹窗
    wiseSearch = () => {
        this.props.drawerStore.setVisible(true);
        this.props.drawerStore.setSearchResultFlag();
    }

    // 触发智能命令弹窗
    setCommandPop = () => {
        this.props.drawerStore.setVisible(true);
        this.props.drawerStore.setCommandPopFlag();
    }

    // 触发组件列表弹窗
    setComponentList = () => {
        this.props.drawerStore.setVisible(true);
        this.props.drawerStore.setComponentWidget(true);
    }

    // 设置布局
    setLayout(visible) {
        this.setState({
            layoutSettingVisible: visible
        });
    }

    render() {
        const { isCollapsed, layoutSettingVisible } = this.state;

        return <div>
            <Header></Header>
            <AppContent>
                <ResizableBox width={this.state.width} minConstraints={[220]} onResize={(event, { element, size }) => {
                    this.setState({ width: size.width, height: size.height, isCollapsed: false });
                }}>
                    <NavSection changeWidth={ this.changeWidth } isCollapsed={ isCollapsed } setCollapsed={ this.setCollapsed }/>
                </ResizableBox>
                <FileListSection />
                <FinEditor />

                <ul className="aside-tools">
                    <li className="wise-search aside-icon" title="智能搜索" onClick={ this.wiseSearch }></li>
                    <li className="wise-command aside-icon" title="智能命令" onClick={ this.setCommandPop }></li>
                    <li className="component-list aside-icon" title="组件列表" onClick={ this.setComponentList }></li>
                    <li className="other-setting aside-icon" title="其它设置" onClick={ () => this.setLayout(true) }></li>
                </ul>
                <CommandPopup></CommandPopup>

                <Modal title="设置组件布局" visible={ layoutSettingVisible } onCancel={ () => this.setLayout(false)} wrapClassName="layout-pop-setting">
                    <div className="row-item">
                        列数: <Input placeholder="列数"/>
                    </div>

                    <div className="row-item">
                        行高: <Input placeholder="行高(像素)" />
                    </div>
                </Modal>
            </AppContent>
        </div>
    }
}