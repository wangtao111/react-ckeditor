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
    height: 100vh;

    .file-list-container {
        width: 360px;
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
                }
            }
        }
    }

    .article-item-hover{
        background-color: #EAF0FB;
    }

    .article-item {
        display: block;
        border: 1px solid #E1E2E6;
        font-size: 12px;
        color: #333;
        padding: 19px 22px;
        >h3{font-weight: bold; color: #666}
        .article-footer{color: #999}
        .content{
             display: flex;
            >p{
                float:left;
                width: 70%;
                overflow: hidden;
                font-size: 13px;
                color:#888;
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
            articleIndex: 0,
            isShrink: props.drawerStore.isVisible,        // 默认不收缩
            popDownSettingVisible: false,               // 设置默认不可见
        };
    }

    componentDidMount() {
        this.props.noteStore.setActiveIndex(0);
        this.setState({activeIndex: 0});

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
    removeNote(index) {
        this.props.noteStore.deleteNote(index);
        if (this.props.noteStore.noteList[index]) {
            this.setActiveNote.bind(this, index);
            this.setState({activeIndex: index});
            eventEmitter.emit('SKIM_ARTICLE', this.props.noteStore.noteList[index])
        }
    }

    // 设置激活的笔记
    setActiveNote(index) {
        this.props.noteStore.setActiveIndex(index);
    }

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
        let { noteList, setNoteList } = this.props.noteStore;

        if(noteList && noteList.length) {
            switch(value) {
                case '创建时间':
                        noteList = noteList.sort((a, b) => {
                            return +moment(b.date) - +moment(a.date);
                        });
    
                        setNoteList(noteList);
                    break;
                case '文件名称':
                        noteList = noteList.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));

                        setNoteList(noteList);
                    break;

                case '文件大小': 
                        noteList = noteList.sort((a, b) => b.size.replace(/[A-Z|a-z]/g, '') - a.size.replace(/[A-Z|a-z]/g, ''));
                        setNoteList(noteList);
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
                noteList = noteList.filter(note => note.title.includes(this.keyword));
            }else {
                noteList = await import('../../mockData/files');
                noteList = noteList.default;
            }

            setActiveIndex(0);

            setNoteList(noteList);
        }
    }

    render() {
        const noteList = this.props.noteStore.noteList;
        const {activeIndex, isShrink, popDownSettingVisible} = this.state;
        const {isVisible} = this.props.drawerStore;
        const { goBackDisabled } = this.props.menuStore;

        const popDownMenus = [
            {
                name: '摘要'
            },
            {
                name: '列表'
            },
            {
                name: '创建时间'
            },
            {
                name: '修改时间'
            },
            {
                name: '文件名称'
            },
            {
                name: '文件大小'
            }
        ];

        return <FileListSectionWrapper shrink={isShrink}>
            <div className="file-list-container">
                <div className="file-list-header">
                    <i className={`icon-back${ goBackDisabled ? ' disabled': '' }`} title="返回上一级" onClick={ () => this.props.menuStore.goBackLevel()}></i>
                    <Input prefix={<i className="icon-search"></i>} placeholder="搜索..." className="search-ipt" onChange={ this.handleChange } onPressEnter={ this.handleSearch }/>
                    <div className="setting-wrapper">
                        <i className="icon-setting" onClick={ this.toggleSettingVisible }></i>

                        <ul className="pop-down-setting" style={{ display: popDownSettingVisible ? 'block' : 'none'}}>
                            {
                                popDownMenus.map((item, index) => {
                                    return <li key={ index } onClick={ () => this.actionOperation(item.name) }>{ item.name }</li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <ul className="article-list">
                    {
                        (noteList && !!noteList.length) && noteList.map((noteItem, index) => {
                            return <li key={index} onClick={() => {
                                this.setActiveNote.bind(this, index);
                                this.setState({activeIndex: index});
                                eventEmitter.emit('SKIM_ARTICLE', noteItem)
                            }}>
                                <a className={`article-item ${index === activeIndex && 'article-item-hover'}`}>
                                    <h3>{noteItem.title}</h3>
                                    <div className='content'><p>{noteItem.briefContent}</p><img src={noteItem.imgUrl}
                                                                                                alt=""/></div>
                                    <div className="article-footer">
                                        <time>{noteItem.date}</time>
                                        <span>{noteItem.size}</span>
                                        <Button icon='delete'
                                                size='small'
                                                style={{marginLeft: '20px'}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.removeNote(index)
                                                }}></Button>
                                    </div>
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>

            <i className={`icon-${isShrink ? 'expand' : 'shrink'}`} title={isShrink ? '展开' : '收缩'}
               onClick={this.toggleWidth}></i>
        </FileListSectionWrapper>
    }
}