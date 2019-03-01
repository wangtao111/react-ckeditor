import React from 'react';
import { Tabs, Button } from 'antd';
import { inject, observer } from 'mobx-react';
import { TemplateHtmlStr } from '../../config/templateConfig';
import styled from "styled-components";
import eventEmitter from "../../event";

const TabPane = Tabs.TabPane;
const Templates = styled.section`
   .template{
        width: 40%;
        margin: 10px 5%;
        float: left;
        >img{
            width: 100%;
            height: 110px;
            border-radius: 3px
        }
   }
`;
@inject('editorStore')
@observer
export default class TemplateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [
                {name: '会议纪录模板', img: require('../../img/huiyi.png')},
                {name: '调研报告模板', img: require('../../img/diaoyan.png')},
                {name: '研究报告模板', img: require('../../img/yanjiu.png')},
                {name: '晨会纪要模板', img: require('../../img/chenhui.png')},
            ]
        }
    }

    useTemplate = (index) => {
        // this.props.editorStore.editor.execCommand('cleardoc');
        // this.props.editorStore.editor.execCommand('template', {
        //     html: TemplateHtmlStr[index]
        // });
        //
        this.props.closeCallback && this.props.closeCallback();
        eventEmitter.emit('NEW_PAGE', 1)
    }

    render() {
        const { templates } = this.state;
        return <Templates>
            <Tabs defaultActiveKey="0">
                <TabPane tab="标准模版" key="0">
                    {
                        (templates && !!templates.length) && templates.map((item, index) => {
                            return <div key={ index } className="template">
                                <img src={item.img} alt=""/>
                                <p style={{marginTop: '10px'}}>
                                    { item.name }
                                    <Button type="primary"
                                            style={{float: 'right', width: '60px', height: '20px', marginRight: '5px', fontSize: '10px'}}
                                            size='small'
                                            onClick={ () => this.useTemplate(3) }>立即使用</Button>
                                </p>
                            </div>
                        })
                    }
                </TabPane>
                <TabPane tab="我的模板" key="1">
                
                </TabPane>
            </Tabs>
        </Templates>
    }
}