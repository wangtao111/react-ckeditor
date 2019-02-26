import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
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
export default class FileListSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articleList: [
                {
                    title: '《看研报》产品分析报告',
                    content: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
                    time: '2018-09-03',
                    size: '7.1MB',
                    imgUrl: 'http://baidu.com'
                },
                {
                    title: '《看研报》产品分析报告',
                    content: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
                    time: '2018-09-03',
                    size: '7.1MB',
                    imgUrl: 'http://baidu.com'
                },
                {
                    title: '《看研报》产品分析报告',
                    content: '产品亮点1、核心能力：核心提供 『搜索 +订阅』内容服务，在 推荐 层面较弱…',
                    time: '2018-09-03',
                    size: '7.1MB',
                    imgUrl: 'http://baidu.com'
                }
            ]
        }
    }

    render() {
        const { articleList } = this.state;

        return <FileListSectionWrapper>
            <div className="file-list-header">
                <Input prefix={<i>搜索图标</i>} className="search-ipt"/>
            </div>

            <ul className="article-list">
                {
                    (articleList && !!articleList.length) && articleList.map((article, index) => {
                        return <li>
                            <a className="article-item">
                                <h3>{ article.title }</h3>
                                <p>{ article.content }</p>
                                <div className="article-footer">
                                    <time>{ article.time }</time>
                                    <span>{ article.size }</span>
                                </div>
                            </a>
                        </li>
                    })
                }
            </ul>

        </FileListSectionWrapper>
    }
}