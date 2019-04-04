// 左侧导航区
import React from 'react';
import { Dropdown, Menu, Modal, Input, Spin } from 'antd';
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
            &:hover {
                color: #3f7cd5;
            }
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

                &.selected {
                    .name {
                        .icon-folder {
                            background-image: url('${require('../../theme/images/icon_file_folder_selected.png')}');
                        }
                    }
                }
                .name {
                    .icon-folder {
                        background: url('${require('../../theme/images/icon_file_folder.png')}')  no-repeat scroll center / 18px 18px;
                    }
                }
            }
        }

        .menu-tree {
            .tree-title {
                display: flex;
                align-items: center;
                line-height: 30px;

                &:hover {
                    color: inherit;
                    background-color: #e4edf8;
                }
               
                .tree-root > .tree-container {
                    margin-left: 30px;
                }

                /* 菜单默认的箭头样式(灰色右箭头) */
                .toggle-arrow {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    margin-left: 10px;
                    margin-top: -2px;
                    background: url('${require('../../theme/images/icon_arrow_right_grey.png')}') no-repeat scroll center / 5px auto;
                    cursor: pointer;
                    vertical-align: -2px;
                }

                /* 菜单选中的箭头样式(白色右箭头) */
                &.selected {
                    .toggle-arrow {
                        background-image: url('${require('../../theme/images/icon_arrow_right_white.png')}')
                    }
                }

                /* 菜单展开箭头样式(灰色下箭头) */
                &.opened {
                    .toggle-arrow {
                        background-image: url('${require('../../theme/images/icon_arrow_down_grey.png')}');
                        background-size: 8px auto;
                    }
                    /* 菜单选中且展开箭头样式(白色下箭头) */
                    &.selected {
                        .toggle-arrow {
                            background-image: url('${require('../../theme/images/icon_arrow_down_white.png')}');
                        }
                    }
                }

                & ~ .tree-container {
                    display: none;
                }

                &.opened ~ .tree-container {
                    display: block;
                }

                &.selected {
                    background-color: #3f7cd5;
                    .name {
                        color: #fff;
                    }
                }

                .name {
                    flex: auto;
                    font-size: 12px;
                    color: #333;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
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
@inject('drawerStore')
@inject('menuStore')
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
                    expandable: true,          // 是否有展开的能力
                    contextMenu: true,         // 是否带有右击菜单上下文
                    // children: [
                    //     {
                    //         name: '新建文件1',
                    //         expandable: true,
                    //         contextMenu: true,
                    //         children: [
                    //             {
                    //                 name: '新建文件夹2',
                    //                 expandable: true,
                    //                 contextMenu: true
                    //             }
                    //         ]
                    //     }
                    // ]
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
            isCollapsed: props.drawerStore.isVisible,        // 默认不收缩
            openedKeys: [],         // 展开的菜单项key
        }

        this.newFileFolder = '';            // 新的文件夹名称
        this.addNewNote = this.addNewNote.bind(this);
    }

    componentDidMount() {
        this.fetchFileFolderList();
    }

    // 获取文件夹列表 
    async fetchFileFolderList() {
        await this.props.menuStore.getFileFolderList({
            userId: '12131',
            directoryLevel: 1,
            status: 1,
            parentId: -1
        });

        const { fileFolderList } = this.props.menuStore;

        this.setState(({ menuList }) => {
            menuList[2].children = JSON.parse(JSON.stringify(fileFolderList));

            return {
                menuList
            };
        })
    }

    setModalVisible(name, value) {
        this.setState({
            [name]: value
        })
    }

    // 增加笔记 
    addNewNote({title, content}) {
        const { noTitleNum } = this.props.noteStore;

        const noteData = {
            title: title || `无标题笔记${ noTitleNum ? `(${noTitleNum})` : ''}`,
            briefContent: '',
            content: content || '',
            date: moment().format('YYYY-MM-DD'),
            size: '',
            imgUrl: ''
        }

        this.props.noteStore.addNote(noteData);
        this.props.noteStore.setActiveIndex(0);
        eventEmitter.emit('SKIM_ARTICLE', noteData)
    }

    // 创建文件夹
    createFolder = (key) => {
        console.log('key: ', key);

        if(typeof key === 'undefined') {
            // 此是从新文档中创建文件夹触发的
            // 1. 如果此时未选中我的文件夹，则加入我的文件夹的下层
            // 2. 否则选择此时选择的父级
            const { selectedKey } = this.props.menuStore;

            if(selectedKey.split(',').length > 2 || selectedKey === '2,-1') {
                key = selectedKey;
            }else {
                key = '2,-1';
            }
        }
        // 展开下级
        this.setOpenedKeys(key, true);

        if(key) {
            const item = this.getDeepItemByKey(key);

            if(item) {
                if(typeof item.children === 'undefined') {
                    item.children = [];
                }
    
                item.children.push({
                    name: '新建文件夹',
                    expandable: true,
                    editable: true,
                    contextMenu: true,
                    add: true
                });
            }
    
            this.setState({
                menuList: this.state.menuList
            });
        }
    }

    // 确定创建文件夹
    confirmCreateFileFolder(menuItem, key) {
        let parentId;
        debugger;

        if(key.split(',').length === 3) {
            parentId = -1;
        }else {
            console.log('item', this.getDeepItemByKey(key));
            debugger;
        }
        this.props.menuStore.createFileFolder({
            userId: '12131',
            parentId,
            directoryName: this.newFileFolder,
            directoryLevel: 1,
            orderLevel: 1
        });
        
        this.setEditable(key, false);

        this.fetchFileFolderList();
    }

    // 创建或更新文件夹
    createOrUpdateFileFolder(menuItem, key) {
        if(menuItem.add) {
            this.confirmCreateFileFolder(menuItem, key);
        }else {
            this.updateFileFolder(menuItem, key);
        }
    }

    // 更新文件夹名称
    updateFileFolder(menuItem, key) {
        const { newFileFolder } = this;

        this.props.menuStore.updateFileFolder({
            id: menuItem.id,
            userId: menuItem.userId,
            parentId: menuItem.parentId,
            directoryName: newFileFolder,
            directoryLevel: menuItem.directoryLevel,
            orderLevel: menuItem.orderLevel,
            status: menuItem.status
        }, {
            indexes: key.split(',').slice(0, -2).reverse(),
            updateKey: 'name',
            updateValue: newFileFolder
        });

        // 请求数据
        this.setEditable(key, false);
    }

    // 删除文件夹(到回收站)
    async putDirToBin(menuItem) {
        await this.props.menuStore.removeFileFolder(menuItem.id);
        this.fetchFileFolderList();
    }

    // 根据key如1,2,3 下标,取出最终项, stopLen停止长度
    getDeepItemByKey(key, stopLen) {
        let indexList = key.split(',');
            
        if(!indexList || !indexList.length) return;

        indexList = indexList.slice(0, -1).reverse();

        const { menuList } = this.state;
        let item = menuList;
        let index = 0;

        while(item && index !== (stopLen || indexList.length)) {
            if(item && typeof item.children === 'undefined') {
                item = item[indexList[index]];
            }else {
                item = item.children[indexList[index]];
            }
            
            index++;
        }

        return item;
    }

    // 设置编辑名称状态
    setEditable(key, editFlag) {
        this.setFolderData(key, 'editable', editFlag);
    }

    // 重命名文件名称
    renameFolderName(key) {
        this.setEditable(key, true);
    }

    // 设置文件夹名称
    setFolderName(e, menuItem, key) {
        this.props.menuStore.updateFileFolder({
            id: menuItem.id,
            userId: menuItem.userId,
            parentId: menuItem.parentId,
            directoryName: e.target.value,
            directoryLevel: menuItem.directoryLevel,
            orderLevel: menuItem.orderLevel,
            status: menuItem.status
        }, {
            indexes: key.split(',').slice(0, -2).reverse(),
            updateKey: 'name',
            updateValue: e.target.value
        });
        // this.setFolderData(key, 'name', e.target.value);
    }

    // 设置文件夹数据
    setFolderData(key, attr, value) {
        const item = this.getDeepItemByKey(key);

        if(item) {
            item[attr] = value;
        }

        this.setState({
            menuList: this.state.menuList
        });
    }

    // 设置已经展开的选项
    setOpenedKeys(key, openFlag) {
        // console.log('key: ', key);
        let { openedKeys } = this.state;

        if(openedKeys && openedKeys.length) {
            // 如果存在,则删除key
            const foundIndex = openedKeys.findIndex(item => item === key);

            if(~foundIndex && openFlag !== true) {
                openedKeys.splice(foundIndex, 1);
            }else {
                openedKeys.push(key);
            }
        }else {
            openedKeys = [];
            openedKeys.push(key);
        }

        this.setState({
            openedKeys
        });
    }

    // 设置已选中的项
    setSelectedKey(key) {
        this.props.menuStore.setSelectedKey(key);
    }

    // 渲染菜单树结构
    renderMenuTree(menuList, parentIndex = -1) {
        if(!menuList || !menuList.length) return;

        const { openedKeys, selectedKeys } = this.state;
        const { selectedKey } = this.props.menuStore;

        return menuList.map((menuItem, index) => {
            const key = `${ index },${ parentIndex }`;

            if(!menuItem.expandable) {
                return <li className="menu-tree-item" onClick={ () => this.setSelectedKey(key) }>
                    <Link icon={ menuItem.icon } selected={ selectedKey === key ? 'selected': '' }>
                        { menuItem.name }
                    </Link>
                </li>
            }else {

                const childMenuLink = (
                    <div 
                        className={`tree-title${ selectedKey === key ? ' selected': ''}${ openedKeys.includes(key) ? ' opened' : '' }`} 
                        style={{ paddingLeft: 20 * (parentIndex.toString().split(',').length - 1) }}
                        onClick={ () => this.setSelectedKey(key) }>
                        <div className="toggle-arrow"  onClick={ () => { this.setOpenedKeys(key)}}></div>

                        <div className="name">
                            <i className="icon-folder"></i>
                            {
                                menuItem.editable ? <CustomInput
                                                        style={{ width: 120 }}
                                                        className="input-folder"
                                                        onPressEnter={ () => this.createOrUpdateFileFolder(menuItem, key)}
                                                        onBlur={ () => this.createOrUpdateFileFolder(menuItem, key) }
                                                        defaultValue={ menuItem.name }
                                                        onChange={ (e) => this.newFileFolder = e.target.value }/> : menuItem.name
                            }
                        </div>
                    </div>
                );

                const folderMenu = (
                    <Menu mode="vertical" style={{ width: 120 }} className="folder-menu">
                        <Menu.SubMenu key="sub1" title="新建" className="folder-submenu">
                            <Menu.Item key="1" onClick={ this.addNewNote }>新建笔记</Menu.Item>
                            <Menu.Item key="2" onClick={ () => this.createFolder(key) }>文件夹</Menu.Item>
                        </Menu.SubMenu>
                        {
                            parentIndex !== -1 && <Menu.Item key="2" onClick={ () => this.renameFolderName(key)}>重命名</Menu.Item>
                        }

                        {
                            parentIndex !== -1 && <Menu.Item key="3" onClick={ () => this.putDirToBin(menuItem)}>删除</Menu.Item>
                        }
                    </Menu>
                );

                return <li className="menu-tree-item" onClick={ (e) => { e.stopPropagation(); this.setSelectedKey(key);}}>
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
        let { isCollapsed } = this.state;

        // isCollapsed = !isCollapsed;

        this.setState({ 
            isCollapsed: !isCollapsed
        }, () => {
            this.props.changeWidth && this.props.changeWidth(isCollapsed ? 220 : 64 );
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isCollapsed && !this.props.isCollapsed) {
            this.setState({
                isCollapsed: this.props.isCollapsed
            }, () => {
                this.props.setCollapsed && this.props.setCollapsed();
            });
        }

        if(this.state.isCollapsed === prevState.isCollapsed && prevProps.drawerStore.isVisible !== this.state.isCollapsed) {
            this.toggleCollapse();
        }

        const { fileFolderList } = this.props.menuStore;

        if(JSON.stringify(fileFolderList) !== JSON.stringify(prevProps.menuStore.fileFolderList)) {
            this.setState(({ menuList }) => {
                menuList[2].children = JSON.parse(JSON.stringify(fileFolderList));
    
                return {
                    menuList
                };
            })
        }
    }

    render() {
        const { 
            menuList,
            templateModalVisible,
            isCollapsed,
        } = this.state;

        const { isVisible } = this.props.drawerStore;
        const { loading } = this.props.menuStore;

        const menu = (<Menu>
            <Menu.Item onClick={ this.addNewNote }>新建笔记</Menu.Item>
            <Menu.Item onClick={ () => this.setModalVisible('templateModalVisible', true) }>新建模板笔记</Menu.Item>
            <Menu.Item onClick={ () => this.createFolder() }>新建文件夹</Menu.Item>
            <Menu.Item>导入word文档</Menu.Item>
            <Menu.Item>导入PDF文档</Menu.Item>
        </Menu>);

        return <NavSectionWrapper>
            <Spin spinning={ loading } delay={500}>
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
            </Spin>
            
            <Modal visible={ templateModalVisible } footer={ null } 
                onCancel={ () => this.setModalVisible('templateModalVisible', false)}>
                <TemplateModal closeCallback={ () => {this.setModalVisible('templateModalVisible', false)} } addNewNote={ this.addNewNote }></TemplateModal>
            </Modal>
        </NavSectionWrapper>
    }
}