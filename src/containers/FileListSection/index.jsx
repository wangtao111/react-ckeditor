import React from 'react';
import {Input, Button} from 'antd';
import styled, {css} from 'styled-components';
import {inject, observer} from 'mobx-react';
import eventEmitter from "../../event";

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
            overflow: auto;
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
            position: absolute;
            width: 20px;
            height: 20px;
            opacity: 0.6;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }

        .icon-back {
            left: 24px;
            top: 22px;
            background: url('${require('../../theme/images/icon_back.png')}') no-repeat scroll 0 0 / 16px auto;
        }

        .icon-setting {
            right: 22px;
            top: 24px;
            background: url('${require('../../theme/images/icon_list_setting.png')}') no-repeat scroll 0 0 / 26px auto;
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
@observer
export default class FileListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleIndex: 0,
            isShrink: props.drawerStore.isVisible,        // 默认不收缩
        };
    }

    componentDidMount() {
        this.props.noteStore.setActiveIndex(0);
        this.setState({activeIndex: 0})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isShrink === prevState.isShrink && prevProps.drawerStore.isVisible !== this.state.isShrink) {
            this.setState({
                isShrink: this.props.drawerStore.isVisible
            });
        }
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

    render() {
        const noteList = this.props.noteStore.noteList;
        const {activeIndex, isShrink} = this.state;
        const {isVisible} = this.props.drawerStore;

        return <FileListSectionWrapper shrink={isShrink}>
            <div className="file-list-container">
                <div className="file-list-header">
                    <i className="icon-back"></i>
                    <Input prefix={<i className="icon-search"></i>} placeholder="搜索..." className="search-ipt"/>
                    <i className="icon-setting"></i>
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

                                        <Button icon="export"
                                                size="small"
                                                title="导出为word"
                                                style={{marginLeft: '10px'}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.exportToWord(index)
                                                }}></Button>
                                        <Button icon="export"
                                                size="small"
                                                title="导出为pdf"
                                                style={{marginLeft: '10px'}}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.exportToPDF(index)
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