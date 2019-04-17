import React from 'react';
import {Input, Button} from 'antd';
import styled, {css} from 'styled-components';
import {inject, observer} from 'mobx-react';
import eventEmitter from "../../event";
import moment from 'moment';
import { toJS } from 'mobx';

const FileListSectionWrapper = styled.div`
    position: relative;
    flex-shrink: 0;    
    .file-list-container {
        width: 360px;
        display: flex;
        flex-direction: column;

        .content-wrapper {
            position: absolute;
            top: 60px;
            left: 0;
            bottom: 0;
            right: 0;
            border-left: 1px solid #e1e2e6; 
        }

        .no-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;

            p {
                color: #868686;
                margin-top: 5px;
                white-space: nowrap;
                font-size: 12px;
            }

            .ant-btn {
                width: 100px;
                margin-top: 10px;
                font-size: 12px;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                padding: 0 5px;
                line-height: 32px;
                color: #ffffff;
                background: #398dee;
                border-radius: 2px;
                border: 1px solid #398dee;
                cursor: pointer;
                outline: none;
            }
        }
    }

    ${props => props.shrink && css`
        .file-list-container {
            width: 0;
            overflow: hidden;
        }
    `}

    ${props => !props.shrink && css`
        .file-list-container {
            width: 360px;
            overflow: visible;
        }
    `}

    .icon-shrink,
    .icon-expand {
        position: absolute;
        width: 13px;
        height: 24px;
        display: inline-block;
        border: 1px solid #E1E2E6;
        cursor: pointer;
    }

    .icon-shrink {
        right: 0;
        top: 20px;
        border-right: 0;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        background: url('${require('../../theme/images/icon_arrow_left_grey.png')}') no-repeat scroll center / 5px auto;
    }

    .icon-expand {
        left: -1px;
        top: 20px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        background: url('${require('../../theme/images/icon_arrow_right_grey.png')}') no-repeat scroll center / 5px auto;
    }
    
    .file-list-header {
        position: relative;
        height: 60px;
        padding-right: 67px;
        padding-left: 53px;
        line-height: 60px;
        border: 1px solid #E1E2E6;

        .icon-back,
        .icon-setting {
            opacity: 0.6;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }

        .icon-back {
            position: absolute;
            width: 20px;
            height: 20px;
            left: 24px;
            top: 22px;
            background: url('${require('../../theme/images/icon_back.png')}') no-repeat scroll 0 0 / 16px auto;
           
            &.disabled {
                opacity: 0.6;
                cursor: default;
                &:hover {
                    opacity: 0.6;
                }
            }
        }

        .icon-setting {
            display: inline-block;
            width: 34px;
            height: 24px;
            vertical-align: middle;
            background: url('${require('../../theme/images/icon_list_setting.png')}') no-repeat scroll center / 26px auto;
        }

        .icon-search {
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url('${require('../../theme/images/icon_search.png')}') no-repeat scroll 0 0 / contain;
        }

        .search-ipt {
            .ant-input {
                border-radius: 22px;
                font-size: 12px;
            }
        }

        .setting-wrapper {
            position: absolute;
            right: 22px;
            top: 0;

            .pop-down-setting {
                position: absolute;
                left: 0;
                top: 59px;
                z-index: 2;
                min-width: 120px;
                border-radius: 2px;
                background-color: #fff;
                box-shadow: 0px 1px 16px 0 rgba(90, 109, 122, 0.41);

                li {
                    line-height: 30px;
                    padding: 0 20px;
                    font-size: 12px;

                    &:hover {
                        color: #76b0f3;
                        background: #f4f9ff;
                        cursor: pointer;
                    }

                    .arrow {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        vertical-align: -5px;
                        background-size: 16px;
                        background-position: center;
                        background-repeat: no-repeat;
                    }

                    .desc {
                        background-image: url('${require('../../theme/images/icon-arrow-down.png')}');
                    }

                    .asc {
                        background-image: url('${require('../../theme/images/icon-arrow-up.png')}');
                    }
                }
            }
        }
    }

    .article-list {
        overflow: auto;
        border-left: 1px solid #E1E2E6;
        height: calc(100vh - 110px);

        & > li:hover {
            .remove-btn {
                display: block;
            }
        }

        .remove-btn {
            display: none;
            position: absolute;
            right: 10px;
            top: 16px;
            width: 28px;
            height: 22px;
            background: url('${require('../../theme/images/icon_recycle_bin.png')}') no-repeat scroll center / 18px;
        }
    }

    .article-item-hover{
        background-color: #EAF0FB;
    }

    .article-item,
    .directory-item {
        position: relative;
        display: block;
        border: 1px solid #E1E2E6;
        border-left: 0;
        font-size: 12px;
        color: #333;
        padding: 19px 22px;
        >h3{font-weight: 500; color: #333; display: inline-block;font-size: 12px;}
        .article-footer,
        .directory-footer {color: #999}
        .content{
             display: flex;
            >p{
                float:left;
                width: 70%;
                overflow: hidden;
                font-size: 12px;
                color:#82828C;
                height: 40px;
                margin: 15px 10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: break-word;
            }
            >img{
                float:left;
                width: 30%;
                height: 70px;
            }
        }
        time {
            margin-right: 15px;
        }
        &:hover {
            background-color: #EAF0FB;
        }
    }
`;
@inject('noteStore')
@inject('drawerStore')
@inject('menuStore')
@observer
export default class FileListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShrink: props.drawerStore.isVisible,        // 默认不收缩
            popDownSettingVisible: false,               // 设置默认不可见
        };

        this.orderRule = 'desc';            // 降序
        this.orderBy = 'modifyTime';        // modifyTime: 修改时间, articleTitle: 笔记标题, createTime: '创建时间', fileSize: '文件大小'
    }

    componentDidMount() {
        window.addEventListener('click', this.clickCallback, false);
    }

    clickCallback = (e) => {
        let targetNode = e.target;
        const isContain = document.querySelector('.setting-wrapper').contains(targetNode);

        if(!isContain && this.state.popDownSettingVisible) {
            this.setState({
                popDownSettingVisible: false
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isShrink === prevState.isShrink && prevProps.drawerStore.isVisible !== this.state.isShrink) {
            this.setState({
                isShrink: this.props.drawerStore.isVisible
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.clickCallback, false);
    }

    // 移除笔记
    // removeNote(index) {
    //     this.props.noteStore.deleteNote(index);
    //     if (this.props.noteStore.noteList[index]) {
    //         this.setActiveNote.bind(this, index);
    //         this.setState({activeIndex: index});
    //         eventEmitter.emit('SKIM_ARTICLE', this.props.noteStore.noteList[index])
    //     }
    // }

    toggleWidth = () => {
        const {isShrink} = this.state;

        this.setState({
            isShrink: !isShrink
        });
    }

    toggleSettingVisible = () => {
        this.setState(({ popDownSettingVisible }) => {
            return {
                popDownSettingVisible: !popDownSettingVisible
            };
        });
    }

    // 选项操作
    actionOperation(value) {
        let { noteList } = this.props.noteStore;
        let filterFlag = false;

        if(noteList && noteList.length) {
            switch(value) {
                case '创建时间':
                    this.orderRule = this.orderBy !== 'createTime' ? 'desc' : (this.orderRule === 'desc' ? 'asc' : 'desc');
                    this.orderBy = 'createTime';
                    filterFlag = true;
                    break;
                case '修改时间': 
                    this.orderRule = this.orderBy !== 'modifyTime' ? 'desc' : (this.orderRule === 'desc' ? 'asc' : 'desc');
                    this.orderBy = 'modifyTime';
                    filterFlag = true;
                    break;
                case '文件名称':
                    this.orderRule = this.orderBy !== 'articleTitle' ? 'desc' : (this.orderRule === 'desc' ? 'asc' : 'desc');
                    this.orderBy = 'articleTitle';
                    filterFlag = true;
                    break;
                case '文件大小':
                    this.orderRule = this.orderBy !== 'fileSize' ? 'desc' : (this.orderRule === 'desc' ? 'asc' : 'desc');
                    this.orderBy = 'fileSize';
                    filterFlag = true;
                    break;
            }

            if(filterFlag) {
                this.props.noteStore.getSubDirAndNotes({
                    userId: '12131',
                    dirId: this.props.menuStore.selectedId,
                    pageSize: 10,
                    pageIndex: 0,
                    orderBy: this.orderBy,
                    orderRule: this.orderRule
                });
            }
        }

        this.toggleSettingVisible();
    }


    convertImagesToBase64() {
        // let tinymce = '';
        // contentDocument = tinymce
        //     .get('content')
        //     .getDoc();
        // var regularImages = contentDocument.querySelectorAll("img");
        // var canvas = document.createElement('canvas');
        // var ctx = canvas.getContext('2d');
        // []
        //     .forEach
        //     .call(regularImages, function (imgElement) {
        //         // preparing canvas for drawing
        //         ctx.clearRect(0, 0, canvas.width, canvas.height);
        //         canvas.width = imgElement.width;
        //         canvas.height = imgElement.height;

        //         ctx.drawImage(imgElement, 0, 0);
        //         // by default toDataURL() produces png image, but you can also export to jpeg
        //         // checkout function's documentation for more details
        //         var dataURL = canvas.toDataURL();
        //         imgElement.setAttribute('src', dataURL);
        //     })
        // canvas.remove();
    }

    handleChange = (e) => {
        this.keyword = e.target.value;
    }

    handleSearch = async () => {
        let { noteList, setNoteList, setActiveIndex } = this.props.noteStore;

        if(Array.isArray(toJS(noteList))) {
            if(this.keyword && this.keyword.trim() !== '') {
                // noteList = noteList.filter(note => note.title.includes(this.keyword));

                this.props.noteStore.getNotesBySearchKey({
                    queryKey: this.keyword,
                    pageIndex: 1,
                    pageSize: 10
                });
            }else {
                noteList = await import('../../mockData/files');
                noteList = noteList.default;
            }

            setActiveIndex(0);

            setNoteList(noteList);
        }
    }

    // 删除文件夹(到回收站)
    async putDirToBin(directory) {
        await this.props.menuStore.removeFileFolder(directory.id);
        this.props.noteStore.getSubDirAndNotes({
            userId: '12131',
            dirId: directory.parentId
        });
    }

    // 增加笔记 
    addNewNote = ({title, content}) => {
        const { noTitleNum } = this.props.noteStore;

        const noteData = {
            articleTitle: title || `无标题笔记${ noTitleNum ? `(${noTitleNum})` : ''}`,
            briefContent: '',
            articleContent: content || '',
            createTime: +new Date,
            fileSize: '',
            imgUrl: ''
        }

        this.props.noteStore.addNote(noteData);
        this.props.noteStore.setActiveIndex(0);
        eventEmitter.emit('SKIM_ARTICLE', noteData)
    }

    render() {
        const { noteList, directoryList, activeIndex } = this.props.noteStore;
        const { isShrink, popDownSettingVisible, } = this.state;
        const { isVisible } = this.props.drawerStore;
        const { goBackDisabled } = this.props.menuStore;
        
        const orderBy = this.orderBy;
        const orderRule = this.orderRule;

        const popDownMenus = [
            {
                name: '摘要'
            },
            {
                name: '列表'
            },
            {
                name: '创建时间',
                value: 'createTime'
            },
            {
                name: '修改时间',
                value: 'modifyTime'
            },
            {
                name: '文件名称',
                value: 'articleTitle'
            },
            {
                name: '文件大小',
                value: 'fileSize'
            }
        ];

        return <FileListSectionWrapper shrink={isShrink}>
            <div className="file-list-container" id="file_list">
                <div className="file-list-header">
                    <i className={`icon-back${ goBackDisabled ? ' disabled': '' }`} title="返回上一级" onClick={ () => this.props.menuStore.goBackLevel()}></i>
                    <Input prefix={<i className="icon-search"></i>} placeholder="搜索..." className="search-ipt" onChange={ this.handleChange } onPressEnter={ this.handleSearch }/>
                    <div className="setting-wrapper">
                        <i className="icon-setting" onClick={ this.toggleSettingVisible }></i>

                        <ul className="pop-down-setting" style={{ display: popDownSettingVisible ? 'block' : 'none'}}>
                            {
                                popDownMenus.map((item, index) => {
                                    return <li key={ index } onClick={ () => this.actionOperation(item.name) }>{ item.name } { orderBy === item.value && <i className={ `arrow ${ orderRule }` }></i>}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                {
                    (!!directoryList.length || !!noteList.length) ? (
                        <ul className="article-list">
                            {
                                (directoryList && !!directoryList.length) && directoryList.map((directory, index) => {
                                    return <li key={ index } >
                                        <a className="directory-item">
                                            <img src={ require('../../theme/images/icon_folder.png') } alt="文件夹logo" width="16px" style={{ verticalAlign: '-1px', marginRight: '10px'}} />
                                            <h3>{ directory.directoryName }</h3>
                                            <div className="directory-footer">
                                                <time>{typeof directory.createTime === 'number' ? moment(directory.createTime).format('YYYY-MM-DD'): directory.createTime || '--'}</time>
                                            </div>

                                            <a className="remove-btn" title="删除" onClick={ () => this.putDirToBin(directory)}></a>
                                        </a>
                                    </li>
                                })
                            }
                            {
                                (noteList && !!noteList.length) && noteList.map((noteItem, index) => {
                                    return <li key={index} onClick={() => {
                                        this.props.noteStore.setActiveIndex(index)
                                        eventEmitter.emit('SKIM_ARTICLE', noteItem)
                                    }}>
                                        <a className={`article-item ${index === activeIndex && 'article-item-hover'}`}>
                                            <h3><img src={ require('../../theme/images/icon_note.png')} alt="笔记logo" width={16} style={{ marginRight: 10, verticalAlign: '-5px'}} />{noteItem.articleTitle }</h3>
                                            <div className='content'>
                                                <p>{noteItem.briefContent}</p>
                                                <img src={noteItem.imgUrl} alt=""/>
                                            </div>
                                            <div className="article-footer">
                                                <time>{typeof noteItem.createTime === 'number' ? moment(noteItem.createTime).format('YYYY-MM-DD'): noteItem.createTime}</time>
                                                <span>{noteItem.fileSize + 'KB'}</span>
                                            </div>
                                        </a>
                                    </li>
                                })
                            }
                        </ul> 
                    ): <div className="content-wrapper">
                        <div className="no-content">
                            <div>
                                <p>没有找到文件</p>
                                <Button onClick={ this.addNewNote }>新建笔记</Button>
                            </div>
                        </div>
                    </div>
                }
                
            </div>

            <i className={`icon-${isShrink ? 'expand' : 'shrink'}`} title={isShrink ? '展开' : '收缩'}
               onClick={this.toggleWidth}></i>
        </FileListSectionWrapper>
    }
}