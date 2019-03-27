import React from 'react';
import styled, { css } from 'styled-components';

const ComponentWidgetsWrapper = styled.div`
    padding: 12px;
    h2 {
        color: #333;
        font-weight: normal;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .widget-list {
        li {
            margin-bottom: 10px;
            cursor: pointer;
        }
    }
`;

const widgets = [
    {
        name: '头部组件',
        logo: 'header_logo'
    },
    {
        name: '标题',
        logo: 'title_logo'
    },
    {
        name: '摘要',
        logo: 'summary_logo'
    },
    {
        name: '股价表现',
        logo: 'stock_logo'
    },
    {
        name: '作者',
        logo: 'author_logo'
    },
    {
        name: '相关文档',
        logo: 'doc_logo'
    },
    {
        name: '目录',
        logo: 'directory_logo'
    },
    {
        name: '正文',
        logo: 'article_logo'
    }
];

export default class ComponentWidgets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ComponentWidgetsWrapper>
            <h2>组件</h2>
            <ul className="widget-list">
                {
                    widgets.map((widget, index) => {
                        return <li key={ index } logo={ widget.logo }>
                            <img src={ require(`../../theme/images/${widget.logo}.png`) } alt=""/>
                        </li>
                    })
                }
            </ul>
        </ComponentWidgetsWrapper>
    }
}