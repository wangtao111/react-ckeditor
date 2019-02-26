import React from 'react';
import { Tabs, Button, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import { TemplateHtmlStr } from '../../config/templateConfig';

const TabPane = Tabs.TabPane;
@inject('editorStore')
@observer
export default class TemplateModal extends React.Component {
    constructor(props) {
        super(props);
    }

    useTemplate = (index) => {
        this.props.editorStore.editor.execCommand('cleardoc');
        this.props.editorStore.editor.execCommand('template', {
            html: TemplateHtmlStr[index]
        });

        this.props.closeCallback && this.props.closeCallback();
    }

    render() {
        return <div>
            <Tabs defaultActiveKey="0">
                <TabPane tab="标准模版" key="0">
                    <Row gutter={ 20 } style={{ marginBottom: 20 }}>
                        <Col span={ 12 }>
                            <div>
                                会议纪录模板
                                <Button type="primary">立即使用</Button>
                            </div>
                        </Col>

                        <Col span={ 12 }>
                            <div>
                                调研报告模板
                                <Button type="primary">立即使用</Button>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={ 20 }>
                        <Col span={ 12 }>
                            <div>
                                研究报告模板
                                <Button type="primary">立即使用</Button>
                            </div>
                        </Col>

                        <Col span={ 12 }>
                            <div>
                                晨会纪要模板
                                <Button type="primary" onClick={ () => this.useTemplate(3) }>立即使用</Button>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="我的模板" key="1">
                
                </TabPane>
            </Tabs>
        </div>
    }
}