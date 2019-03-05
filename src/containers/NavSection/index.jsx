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
    width: 220px;
    height: 100%;
    flex-shrink: 0;

    .operation-tools {
        text-align: center;
        padding: 15px 0;
        height: 46px;
        .ant-dropdown-trigger {
            padding-left: 34px;
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
                    icon: 'icon_file_folder'
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

    render() {
        const { menuList, templateModalVisible, selectedIndex } = this.state;

        const menu = (<Menu>
            <Menu.Item onClick={ this.addNewNote }>新建笔记</Menu.Item>
            <Menu.Item onClick={ () => this.setModalVisible('templateModalVisible', true) }>新建模板笔记</Menu.Item>
            <Menu.Item>新建文件夹</Menu.Item>
            <Menu.Item>导入word文档</Menu.Item>
            <Menu.Item>导入PDF文档</Menu.Item>
        </Menu>);

        return <NavSectionWrapper>
            <div className="operation-tools">
                <Dropdown overlay={ menu }><a><i className="icon-add"></i>新文档</a></Dropdown>
            </div>

            <ul className="menu-list">
                {
                    (menuList && !!menuList.length) && menuList.map((menuItem, index) => {
                        return <li key={ index } className="menu-item" onClick={ this.setActiveIndex.bind(this, index) }>
                            <Link icon={ menuItem.icon } selected={ selectedIndex === index ? 'selected': '' }>{ menuItem.name }</Link>
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