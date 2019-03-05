import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
const FileListSectionWrapper = styled.div`
    width: 360px;
    flex-shrink: 0;

    .file-list-header {
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        border: 1px solid #E1E2E6;

        .search-ipt {
            .ant-input {
                border-radius: 22px;
            }
        }
    }
    .article-item {
        display: block;
        border: 1px solid #E1E2E6;
        font-size: 12px;
        color: #333;
        padding: 19px 22px;

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

        this.state = {};
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

        return <FileListSectionWrapper>
            <div className="file-list-header">
                <Input prefix={<i>搜索图标</i>} className="search-ipt"/>
            </div>

            <ul className="article-list">
                {
                    (noteList && !!noteList.length) && noteList.map((noteItem, index) => {
                        return <li key={ index }>
                            <a className="article-item" onClick={ this.setActiveNote.bind(this, index)}>
                                <h3>{ noteItem.title }</h3>
                                <p>{ noteItem.briefContent }</p>
                                <div className="article-footer">
                                    <time>{ noteItem.date }</time>
                                    <span>{ noteItem.size }</span>
                                </div>
                                <Button onClick={ this.removeNote.bind(this, index) }>删除</Button>
                            </a>
                        </li>
                    })
                }
            </ul>

        </FileListSectionWrapper>
    }
}