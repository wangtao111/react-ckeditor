import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import eventEmitter from "../../event";
const FileListSectionWrapper = styled.div`
    width: 360px;
    flex-shrink: 0;
    
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
@observer
export default class FileListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleIndex: 0
        };
    }

    // 移除笔记
    removeNote(index) {
        const { noteList, setNoteList } = this.props.noteStore;
        const noteListCopy = [ ...noteList ];

        noteListCopy.splice(index, 1);
        setNoteList(noteListCopy);
    }

    // 设置激活的笔记
    setActiveNote(index) {
        this.props.noteStore.setActiveIndex(index);
    }

    render() {

        const noteList = this.props.noteStore.noteList;
        const {activeIndex} = this.state;

        return <FileListSectionWrapper>
            <div className="file-list-header">
                <i className="icon-back"></i>
                <Input prefix={<i className="icon-search"></i>} placeholder="搜索..." className="search-ipt"/>
                <i className="icon-setting"></i>
            </div>

            <ul className="article-list">
                {
                    (noteList && !!noteList.length) && noteList.map((noteItem, index) => {
                        return <li key={ index } onClick={ () => { this.setActiveNote.bind(this, index); this.setState({activeIndex: index}); eventEmitter.emit('SKIM_ARTICLE', noteItem) }}>
                            <a className={`article-item ${index === activeIndex && 'article-item-hover'}`}>
                                <h3>{ noteItem.title }</h3>
                                <div className='content'><p>{ noteItem.briefContent }</p><img src={noteItem.imgUrl} alt=""/></div>
                                <div className="article-footer">
                                    <time>{ noteItem.date }</time>
                                    <span>{ noteItem.size }</span>
                                    <Button icon='delete'
                                            size='small'
                                            style={{marginLeft: '20px'}}
                                            onClick={() => {this.props.noteStore.deleteNote(index)}}></Button>
                                </div>
                            </a>
                        </li>
                    })
                }
            </ul>

        </FileListSectionWrapper>
    }
}