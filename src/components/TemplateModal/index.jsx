import React from 'react';
import { Tabs, Button, Row } from 'antd';
import { inject, observer } from 'mobx-react';
// import { TemplateHtmlStr } from '../../config/templateConfig';
import styled from "styled-components";
import eventEmitter from "../../event";
import { researchReport, morningNote } from '../../widgets/templates';

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

   .my-template-box {
       display: flex;
       justify-content: space-between;

       .template-item {
           width: 50%;
       }

       .add-new-template {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            height: 122px;
            border: 1px dashed #ccc;
            border-radius: 4px;
            cursor: pointer;

            img {
                max-width: 28px;
            }

            .new-txt {
                margin-top: 5px;
                color: #333;
                font-size: 12px;
            }

       }
   }
`;
@inject('editorStore')
@inject('drawerStore')
@observer
export default class TemplateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templates: [
                {name: '会议纪录模板', img: require('../../img/huiyi.png'), template: ''},
                {name: '调研报告模板', img: require('../../img/diaoyan.png'), template: ''},
                {name: '研究报告模板', img: require('../../img/yanjiu.png'), template: researchReport},
                {name: '晨会纪要模板', img: require('../../img/chenhui.png'), template: morningNote},
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
        // eventEmitter.emit('NEW_PAGE', 1)
        eventEmitter.emit('NEW_PAGE', this.state.templates[index]);
    }

    addNewTemplate = () => {
        this.props.drawerStore.setVisible(true);
        this.props.drawerStore.setComponentWidget(true);
        
        this.props.closeCallback && this.props.closeCallback();
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
                                            onClick={ () => this.useTemplate(index) }>立即使用</Button>
                                </p>
                            </div>
                        })
                    }
                </TabPane>
                <TabPane tab="我的模板" key="1">
                    <div className="my-template-box">
                        <div className="add-new-template template-item" onClick={ this.addNewTemplate }>
                            <img src={require('../../theme/images/icon_add_template.png')} alt="模板icon"/>
                            <div className="new-txt">新建模板</div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Templates>
    }
}