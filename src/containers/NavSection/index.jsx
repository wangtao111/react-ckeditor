// 左侧导航区
import React from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import styled, { css } from 'styled-components';
import TemplateModal from '../../components/TemplateModal';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import eventEmitter from "../../event";

const NavSectionWrapper = styled.section`
    background-color: #F5F5F5;
    height: 100%;
    flex-shrink: 0;

    .operation-tools {
        text-align: center;
        padding: 15px 0;
        height: 46px;

        .btn-new-doc {
            background: url('${require('../../theme/images/icon_arrow_down_grey.png')}') no-repeat scroll 80px center / 6px auto;
        }

        .ant-dropdown-trigger {
            padding-left: 34px;
            padding-right: 20px;
            position: relative;
            font-size: 12px;
            color: #393939;
        }

        .icon-add {
            position: absolute;
            left: 0;
            top: -6px;
            width: 28px;
            height: 28px;
            background: url('${require('../../theme/images/icon_add.png')}') no-repeat scroll center / 18px 18px;;
        }
        img{
            width: 16px;
            height: 16px;
            margin-right: 5px;
        }
    }

    .menu-list{
        margin: 0 auto;
        width: 200px;
        img{
            width: 16px;
            height: 16px;
            margin-right: 10px;
            display: inline-block
        }

        .tree-root {
            .tree-title {
                .arrow {
                    position: absolute;
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-left: -51px;
                    margin-top: 11px;
                    vertical-align: -2px;
                    background: url('${require('../../theme/images/icon_arrow_right_grey.png')}') no-repeat scroll center / 5px auto;
                    cursor: pointer;
                }

                &.expanded {
                    .arrow {
                        background-image: url('${require('../../theme/images/icon_arrow_down_white.png')}') !important;
                        background-size: 8px auto;
                    }
                }
            }
        }
        
        .tree-container {
            .filetree-item {
                font-size: 12px;
                padding-left: 60px; 
                height: 30px;
                line-height: 30px;
            }
        }
    }
`;

const Link = styled.a`
            display: block;
            position: relative;
            height: 40px;
            line-height: 40px;
            color: #333;
            padding-left: 60px;
            font-size: 12px;
            transition: all 0.3s;
            &:hover {
                color: inherit;
                background-color: #e4edf8;
                ${props => props.icon && props.selected === 'selected' && css`
                    background-color: #3f7cd5;
                    color: #fff;
                `}
            }

            ${props => props.icon && props.selected === 'selected' && css`
                background-color: #3f7cd5;
                color: #fff;
                & > .arrow {
                    background-image: url('${require('../../theme/images/icon_arrow_right_white.png')}') !important;
                }
            `}
            
            &:before {
                ${props => props.icon && css`
                    content: '';
                    position: absolute;
                    left: 28px;
                    top: 6px;
                    background: url('${require(`../../theme/images/${ props.icon }${props.selected !== '' ? '_selected': ''}.png`)}') no-repeat scroll center / 18px 18px;
                    width: 24px;
                    height: 24px;
                `}
            }
`

@inject('noteStore')
@observer
export default class NavSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuList: [
                {
                    name: '最新文档',
                    icon: 'icon_doc'
                },
                {
                    name: '与我分享',
                    icon: 'icon_share_me'
                },
                {
                    name: '我的文件夹',
                    icon: 'icon_file_folder',
                    expandable: true,
                    contextMenu: true,
                    children: [
                        {
                            name: '新建文件夹'
                        },
                        {
                            name: '新建文件夹2'
                        },
                        {
                            name: '新建文件夹3'
                        },
                        {
                            name: '新建文件夹4'
                        }
                    ]
                },
                {
                    name: '标签',
                    icon: 'icon_tag'
                },
                {
                    name: '回收站',
                    icon: 'icon_recycle_bin'
                }
            ],
            templateModalVisible: false,
            selectedIndex: 0,       // 选择的下标
            folderExpanded: false,          // 文件夹是否展开(默认不展开)
        }

        this.addNewNote = this.addNewNote.bind(this);
    }

    setModalVisible(name, value) {
        this.setState({
            [name]: value
        })
    }

    // 增加笔记 
    addNewNote() {
        const { noTitleNum } = this.props.noteStore;

        const noteData = {
            title: `无标题笔记${ noTitleNum ? `(${noTitleNum})` : ''}`,
            briefContent: '',
            content: '',
            date: moment().format('YYYY-MM-DD'),
            size: '',
            imgUrl: ''
        }

        this.props.noteStore.addNote(noteData);
        this.props.noteStore.setActiveIndex(0);
        eventEmitter.emit('SKIM_ARTICLE', noteData)
    }

    // 设置激活菜单下标
    setActiveIndex(index) {
        this.setState({
            selectedIndex: index
        });
    }

    // 展开或收缩下层
    toggleExpand = () => {
        const { folderExpanded } = this.state;

        this.setState({
            folderExpanded: !folderExpanded
        });
    }

    render() {
        const { 
            menuList,
            templateModalVisible,
            selectedIndex,
            folderExpanded 
        } = this.state;

        const menu = (<Menu>
            <Menu.Item onClick={ this.addNewNote }>新建笔记</Menu.Item>
            <Menu.Item onClick={ () => this.setModalVisible('templateModalVisible', true) }>新建模板笔记</Menu.Item>
            <Menu.Item>新建文件夹</Menu.Item>
            <Menu.Item>导入word文档</Menu.Item>
            <Menu.Item>导入PDF文档</Menu.Item>
        </Menu>);

        const folderMenu = (
            <Menu mode="vertical" style={{ width: 120 }} className="folder-menu">
                <Menu.SubMenu key="sub1" title="新建" className="folder-submenu">
                    <Menu.Item key="1">文件夹</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );

        return <NavSectionWrapper>
            <div className="operation-tools">
                <Dropdown overlay={ menu }><a className="btn-new-doc"><i className="icon-add"></i>新文档</a></Dropdown>
            </div>

            <ul className="menu-list">
                {
                    (menuList && !!menuList.length) && menuList.map((menuItem, index) => {
                        let menuLink = <Link icon={ menuItem.icon } selected={ selectedIndex === index ? 'selected': '' }>
                                { menuItem.name }
                        </Link>;
                        
                        // 有下级的
                        if(menuItem.expandable) {
                            menuLink = <div className="tree-root">
                                <div className={`tree-title expandable${ folderExpanded ? ' expanded': '' }`}>
                                    <Link icon={ menuItem.icon } selected={ selectedIndex === index ? 'selected': '' }>
                                        {
                                            menuItem.expandable && <i className="arrow" onClick={ this.toggleExpand }></i>
                                        }
                                        { menuItem.name }
                                    </Link>
                                </div>

                                {
                                    (menuItem.children && menuItem.children.length && folderExpanded) && (
                                        <div className="tree-container">
                                            <ul>
                                                {
                                                    menuItem.children.map((item, index) => {
                                                        return <li key={ index } className="filetree-item">{ item.name }</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        }

                        return <li key={ index } className="menu-item" onClick={ this.setActiveIndex.bind(this, index) }>
                            {
                                menuItem.contextMenu ? <Dropdown overlay={ folderMenu } trigger={['contextMenu']}>
                                    { menuLink }
                                </Dropdown> : menuLink
                            }
                        </li>
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