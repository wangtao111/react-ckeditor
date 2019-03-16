// 左侧导航区
import React from 'react';
import { Dropdown, Menu, Modal, Input } from 'antd';
import styled, { css } from 'styled-components';
import TemplateModal from '../../components/TemplateModal';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import eventEmitter from "../../event";
import CustomInput from './CustomInput';
import MenuWithContext from '../../components/MenuWithContext';

const NavSectionWrapper = styled.section`
    background-color: #F5F5F5;
    height: 100%;
    flex-shrink: 0;

    .expand-layout {
        position: relative;

        .icon-collapse {
            position: fixed;
            left: 22px;
            bottom: 10px;
            color: #959FB1;
            cursor: pointer;

            &:hover {
                color: #3f7cd5;
            }
        }
    }

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

    .collapse-layout {
        .icon-expand {
            position: fixed;
            left: 23px;
            bottom: 10px;
            color: #959FB1;
            cursor: pointer;

            &:hover {
                color: #3f7cd5;
            }
        }

        .sidebar-item {
            text-align: center;
            height: 60px;
            line-height: 60px;
            cursor: pointer;

            &:hover {
                background-color: #e4edf8;
            }

            .icon-add-doc {
                color: #407CD5;
            }
        }

        .icon_doc,
        .icon_share_me,
        .icon_file_folder,
        .icon_tag,
        .icon_recycle_bin {
            display: inline-block;
            vertical-align: middle;
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-attachment: scroll;
            background-position: center;
            background-size: 22px auto;
        }

        .icon_doc {
            background-image: url('${require('../../theme/images/icon_doc.png')}');
        }

        .icon_share_me {
            background-image: url('${require('../../theme/images/icon_share_me.png')}');
        }

        .icon_file_folder {
            background-image: url('${require('../../theme/images/icon_file_folder.png')}');
        }

        .icon_tag {
            background-image: url('${require('../../theme/images/icon_tag.png')}');
        }

        .icon_recycle_bin {
            background-image: url('${require('../../theme/images/icon_recycle_bin.png')}');
        }
    }

    .menu-list{
        margin: 0 auto;
        img{
            width: 16px;
            height: 16px;
            margin-right: 10px;
            display: inline-block
        }

        & > .menu-tree-item {
            & > .menu-tree > .tree-title {
                height: 40px;
                line-height: 40px;

                .name {
                    .icon-folder {
                        background: url('${require('../../theme/images/icon_file_folder.png')}')  no-repeat scroll center / 18px 18px;
                    }
                }
            }
        }

        .menu-tree {
            .tree-title {
                line-height: 30px;
                .toggle-arrow,
                .name {
                    display: inline-block;
                }

                .toggle-arrow {
                    display: inline-block;
                    margin-left: 10px;
                    width: 14px;
                    height: 14px;
                    background: url('${require('../../theme/images/icon_arrow_right_grey.png')}') no-repeat scroll center / 5px auto;
                    cursor: pointer;
                    vertical-align: -2px;
                }

                .name {
                    font-size: 12px;
                    color: #333;
                    cursor: pointer;

                    .icon-folder {
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        margin-left: 4px;
                        margin-right: 8px;
                        vertical-align: -7px;
                        background: url('${require('../../theme/images/icon_folder.png')}')  no-repeat scroll center / 18px auto;
                    }

                    .input-folder {
                        height: 25px;
                        border-radius: 0;
                        font-size: 12px;
                        color: #333;
                    }
                }
            }
        }


        .tree-title {
            &:hover {
                color: inherit;
                background-color: #e4edf8;
            }
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

            &.selected {
                background-color: #3f7cd5;
                .name {
                    color: #fff;
                }
            }

            .tree-root >.tree-container {
                margin-left: 30px;
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
                    expanded: false,
                    contextMenu: true,
                    children: [
                        {
                            name: '新建文件1',
                            expandable: true,
                            children: [
                                {
                                    name: '新建文件夹2',
                                    expandable: true,
                                }
                            ]
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
            activeKey: '0,-1',       // 激活的项
            folderExpanded: false,          // 文件夹是否展开(默认不展开)
            isCollapsed: false
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

    // 设置激活菜单项
    setActiveKey = (key) => {
        // debugger;
        this.setState({
            activeKey: key
        });
    }

    // 展开或收缩下层
    toggleExpand = () => {
        const { folderExpanded } = this.state;

        this.setState({
            folderExpanded: !folderExpanded
        });
    }

    // 创建文件夹
    createFolder = () => {
        const { menuList } = this.state;
        const myFolder = menuList[2];

        if(myFolder) {
            if(typeof myFolder.children === 'undefined') {
                myFolder.children = [];
            }

            myFolder.children.push({
                name: '新建文件夹',
                expandable: true,
                editable: true
            });
        }

        this.setState({
            menuList
        });
    }

    // 设置编辑名称状态
    setEditable(index, editFlag) {
        this.setFolderData(index, 'editable', editFlag);
    }

    // 设置文件夹名称
    setFolderName(e, index) {
        this.setFolderData(index, 'name', e.target.value);
    }

    // 设置文件夹数据
    setFolderData(index, attr, value) {
        const { menuList } = this.state;
        const myFolder = menuList[2];

        if(myFolder) {
            myFolder.children[index][attr] = value;
        }

        this.setState({
            menuList: menuList
        });
    }

    // 渲染菜单树结构
    renderMenuTree(menuList, parentIndex = -1) {
        if(!menuList || !menuList.length) return;

        const { activeKey } = this.state;
        return menuList.map((menuItem, index) => {
            if(!menuItem.expandable) {
                return <li className="menu-tree-item" onClick={ () => this.setActiveKey(`${index},${parentIndex}`) }>
                    <Link icon={ menuItem.icon } selected={ activeKey === `${index},${parentIndex}` ? 'selected': '' }>
                            { menuItem.name }
                    </Link>
                </li>
            }else {
                const childMenuLink = (
                    <div className={`tree-title expandable${ activeKey === `${ index },${ parentIndex }` ? ' selected': ''}`} style={{ paddingLeft: 20 * (parentIndex.toString().split(',').length - 1) }}>
                        <div className="toggle-arrow"></div>

                        <div className="name">
                            <i className="icon-folder"></i>
                            {
                                menuItem.editable ? <CustomInput
                                                        style={{ width: 120 }}
                                                        className="input-folder"
                                                        onPressEnter={ () => this.setEditable(index, false)}
                                                        onBlur={ () => this.setEditable(index, false) }
                                                        value={ menuItem.name }
                                                        onChange={ (e) => this.setFolderName(e, index) }/> : menuItem.name
                            }
                        </div>
                    </div>
                );

                const folderMenu = (
                    <Menu mode="vertical" style={{ width: 120 }} className="folder-menu">
                        <Menu.SubMenu key="sub1" title="新建" className="folder-submenu">
                            <Menu.Item key="1" onClick={ this.createFolder }>文件夹</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                );

                return <li className="menu-tree-item" onClick={ (e) => { e.stopPropagation(); this.setActiveKey(`${ index },${ parentIndex }`)} }>
                    <div className="menu-tree">
                        {
                            menuItem.contextMenu ? <MenuWithContext contextMenus={ folderMenu }>
                                {
                                    childMenuLink
                                }
                            </MenuWithContext> : childMenuLink
                        }
        
                        {
                            menuItem.children && <ul className="tree-container">
                                {
                                    this.renderMenuTree(menuItem.children, `${ index },${ parentIndex }`)
                                }
                            </ul>
                        }
                    </div>
                </li>
            }
        })

    }

    toggleCollapse = () => {
        const { isCollapsed } = this.state;

        this.setState({ 
            isCollapsed: !isCollapsed 
        }, () => {
            this.props.changeWidth && this.props.changeWidth(isCollapsed ? 220 : 64 );
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isCollapsed && !this.props.isCollapsed) {
            this.setState({
                isCollapsed: this.props.isCollapsed
            }, () => {
                this.props.setCollapsed && this.props.setCollapsed();
            });
        }
    }

    render() {
        const { 
            menuList,
            templateModalVisible,
            folderExpanded,
            isCollapsed
        } = this.state;

        const menu = (<Menu>
            <Menu.Item onClick={ this.addNewNote }>新建笔记</Menu.Item>
            <Menu.Item onClick={ () => this.setModalVisible('templateModalVisible', true) }>新建模板笔记</Menu.Item>
            <Menu.Item onClick={ this.createFolder }>新建文件夹</Menu.Item>
            <Menu.Item>导入word文档</Menu.Item>
            <Menu.Item>导入PDF文档</Menu.Item>
        </Menu>);

        return <NavSectionWrapper>
            <div className="expand-layout" style={{ display: isCollapsed ? 'none' : 'block' }}>
                <div className="operation-tools">
                    <Dropdown overlay={ menu }><a className="btn-new-doc"><i className="icon-add"></i>新文档</a></Dropdown>
                </div>

                <ul className="menu-list">
                    {
                        this.renderMenuTree(menuList)
                    }
                </ul>

                <i className="icon-collapse iconfont icon-db-left-arrow" onClick={ this.toggleCollapse }></i>
            </div>

            <div className="collapse-layout" style={{ display: isCollapsed ? 'block' : 'none' }}>
                <div className="sidebar-item" title="添加">
                    <i className="iconfont icon-add-doc"></i>
                </div>
                {
                    (menuList && !!menuList.length) && menuList.map((menu, index) => {
                        return <div className="sidebar-item" title={ menu.name } key={ index }>
                            <i className={ menu.icon }></i>
                        </div>
                    })
                }

                <i className="icon-expand iconfont icon-db-right-arrow" onClick={ this.toggleCollapse }></i>
            </div>
            
            <Modal visible={ templateModalVisible } footer={ null } 
                onCancel={ () => this.setModalVisible('templateModalVisible', false)}>
                <TemplateModal closeCallback={ () => this.setModalVisible('templateModalVisible', false) }></TemplateModal>
            </Modal>
        </NavSectionWrapper>
    }
}