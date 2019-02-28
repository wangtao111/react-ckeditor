import React from 'react';
import { Dropdown, Menu, Upload, Modal } from 'antd';
import styled from 'styled-components';
import TemplateModal from '../../components/TemplateModal';
import eventEmitter from "../../event";

const NavSectionWrapper = styled.section`
    background-color: #F5F5F5;
    width: 100%;
    flex-shrink: 0;

    .operation-tools {
        text-align: center;
        padding: 15px 0;
        height: 46px;
        .upload-btn {
            margin-left: 20px;
        }
        img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .menu-item {
        a {
            display: block;
            height: 40px;
            line-height: 40px;
            color: #333;
            padding-left: 56px;
            transition: all 0.3s;
            &:hover {
                background-color: #407CD5;
                color: #fff;
            }
        }
    }
`;

export default class NavSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuList: [
                {
                    name: '最新文档'
                },
                {
                    name: '与我分享'
                },
                {
                    name: '我的文件夹'
                },
                {
                    name: '标签'
                },
                {
                    name: '回收站'
                }
            ],
            templateModalVisible: false
        }
    }

    setModalVisible(name, value) {
        this.setState({
            [name]: value
        })
    }

    render() {
        const { menuList, templateModalVisible } = this.state;

        const menu = (<Menu>
            <Menu.Item onClick={ () => eventEmitter.emit('NEW_PAGE') }>新建笔记</Menu.Item>
            <Menu.Item onClick={ () => this.setModalVisible('templateModalVisible', true) }>新建模板笔记</Menu.Item>
            <Menu.Item>新建文件夹</Menu.Item>
            <Menu.Item>导入word文档</Menu.Item>
            <Menu.Item>导入PDF文档</Menu.Item>
        </Menu>);

        return <NavSectionWrapper>
            <div className="operation-tools">
                <Dropdown overlay={ menu }><a><img src={require('../../img/add.png')} alt=""/>新文档</a></Dropdown>
                <Upload className="upload-btn"><img src={require('../../img/upload.png')} alt=""/>上传</Upload>
            </div>

            <ul className="menu-list">
                {
                    (menuList && !!menuList.length) && menuList.map((menuItem, index) => {
                        return <li key={ index } className="menu-item"><a>{ menuItem.name }</a></li>
                    })
                }
            </ul>
            
            <Modal visible={ templateModalVisible } footer={ null } 
                onCancel={ () => this.setModalVisible('templateModalVisible', false)}>
                <TemplateModal closeCallback={ () => this.setModalVisible('templateModalVisible', false) }></TemplateModal>
            </Modal>
        </NavSectionWrapper>
    }
}