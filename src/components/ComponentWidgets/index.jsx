import React from 'react';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { Template } from '../../widgets/templates';

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

    .anticon-close.close {
        margin-right: 0;
        margin-top: 4px;
    }
`;

const widgets = [
    {
        name: '头部组件',
        logo: 'header_logo',
        template: {
            widget: '头部',
            template: {
                headerLogo: '',
                headerTitle: '华泰证券',
                templateType: '研究类别',
                date: moment().format('YYYY年MM月DD日')
            }
        },
    },
    {
        name: '标题',
        logo: 'title_logo',
        template: {
            widget: '标题',
            template: {
                titleName: '标题名称',
                width: '65%',
                className: 'align-left',
            }
        },
    },
    {
        name: '摘要',
        logo: 'summary_logo',
        template: {
            widget: '摘要',
            template: {
                titleName: '核心观点',
                width: '65%',
                className: 'align-left',
            }
        }
    },
    {
        name: '股价表现',
        logo: 'stock_logo'
    },
    {
        name: '作者',
        logo: 'author_logo',
        template: {
            widget: '摘要',
            template: {
                titleName: '核心观点',
                width: '65%',
                className: 'align-left',
            }
        }
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

    componentDidMount() {
        // 监听组件widget拖拽
        this.addWidgetDragAndDrop();
    }

    addWidgetDragAndDrop = () => {
        window.CKEDITOR.document.getById('widgetList').on('dragstart', function(evt) {
            let target = evt.data.getTarget().getAscendant('li', true);
            window.CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);

            const dataTransfer = evt.data.dataTransfer;
            const template = widgets[target.data('widget-key')].template;

            dataTransfer.setData('widgetData', Template.generateTemplateHtml([template]));
            dataTransfer.setData('text/html', target.getText());
            if (dataTransfer.$.setDragImage) {
                dataTransfer.$.setDragImage(target.findOne('img').$, 0, 0);
            }
        })
    }

    render() {
        return <ComponentWidgetsWrapper>
            <Icon type='close' className='close' onClick={() => {this.props.closeCallback()}}></Icon>
            <h2>组件</h2>
            <ul className="widget-list" id="widgetList">
                {
                    widgets.map((widget, index) => {
                        return <li key={ index } logo={ widget.logo } draggable="true" data-widget-key={ index }>
                            <img src={ require(`../../theme/images/${widget.logo}.png`) } alt="组件logo" />
                        </li>
                    })
                }
            </ul>
        </ComponentWidgetsWrapper>
    }
}