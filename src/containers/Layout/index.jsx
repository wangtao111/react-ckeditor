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
        background-color: #F7F7F7;
        line-height: 30px;
        padding-top: 14px;
    }

    .aside-icon {
        position: relative;
        display: block;
        height: 36px;
        line-height: 36px;
        background-position: center;
        background-size: 18px;
        background-repeat: no-repeat;
        font-size: 20px;
        color: #696969;
        cursor: pointer;
        
        .triangle {
            display: none;
            position: absolute;
            border: 5px solid transparent;
            border-left-color: #5A5A5A;
            top: calc(50% - 0.2em);
        }

        &:hover {
            color: #fff;
            background-color: #6C9AF0;

            i {
                display: block;
            }

            &:after {
                position: absolute;
                left: -73px;
                top: 0;
                content: attr(data-title);
                background-color: #5A5A5A;
                font-size: 14px;
                padding: 0 0.6em;
            }
        }
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
                    <li className="aside-icon iconfont icon-abc-search" data-title="智能搜索" onClick={ this.wiseSearch }><i className="triangle"></i></li>
                    <li className="aside-icon iconfont icon-abc-edit" data-title="智能命令" onClick={ this.setCommandPop }><i className="triangle"></i></li>
                    <li className="aside-icon iconfont icon-abc-list" data-title="组件列表" onClick={ this.setComponentList }><i className="triangle"></i></li>
                    <li className="aside-icon iconfont icon-abc-setting" data-title="其它设置" onClick={ () => this.setLayout(true) }><i className="triangle"></i></li>
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