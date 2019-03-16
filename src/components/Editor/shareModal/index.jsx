import React from 'react';
import {inject, observer} from 'mobx-react';
import styled from 'styled-components';
import { Modal, Tabs, Input, Button, Radio, Icon, Tree } from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const { TreeNode } = Tree;
const ShareComponent = styled.div`
`;

@inject('editorStore')
@observer
export default class ShareModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: 2,
            value2: 1,
            users: [
                {name: '孙喵喵', img: ''},
                {name: '何晓华', img: ''},
                {name: '魏晓松', img: ''},
                {name: '朱隆飞', img: ''},
                {name: '夏东东', img: ''},
                {name: '徐环环', img: ''}
            ]
        }
    }
    componentDidMount(){
        this.props.onRef(this)
    }

    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {

    }
    callback = (key) => {
        console.log(key);
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    render() {
        const {visible, users} = this.state;

        return <ShareComponent>
            <Modal
                visible={visible}
                footer = {null}
                width = {600}
                style={{borderRadius: '2px'}}
                maskStyle = {{backgroundColor: 'rgba(0,0,0,0.3)'}}
                onCancel={() => this.setState({visible: false})}
            >
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="分享链接" key="1" style={{fontSize: '12px', color: '#333'}}>
                        <p style={{marginBottom: '20px'}}>分享链接</p>
                        <div style={{display: 'flex', height: '40px'}}>
                            <Input type="text" style={{border: '1px solid #eee'}}/>
                            <Button style={{marginLeft: '5px', background: '#407CD5', color: '#fff'}}>复制链接</Button>
                        </div>
                        <p style={{lineHeight: '50px', marginTop: '10px'}}>设置分享权限</p>
                        <div style={{display: 'flex', height: '40px'}}>
                            <span style={{marginRight: '20px'}}>编辑</span>
                            <RadioGroup onChange={(e) => this.setState({value: e.target.value})} value={this.state.value}>
                                <Radio value={1}><span style={{fontSize: '12px', color: '#333'}}>允许编辑</span></Radio>
                                <Radio value={2}><span style={{fontSize: '12px', color: '#333'}}>仅查看</span></Radio>
                            </RadioGroup>
                        </div>
                        <div style={{display: 'flex', height: '40px', fontSize: '12px', color: '#333'}}>
                            <span style={{marginRight: '20px'}}>评论</span>
                            <RadioGroup onChange={(e) => this.setState({value2: e.target.value})}
                                        value={this.state.value2}>
                                <Radio value={1}><span style={{fontSize: '12px', color: '#333'}}>可评论</span></Radio>
                                <Radio value={2}><span style={{fontSize: '12px', color: '#333'}}>不可评论</span></Radio>
                            </RadioGroup>
                        </div>
                        <div style={{display: 'flex', padding: '15px 0', borderTop: '1px solid #eee',marginTop: '20px'}}>
                            分享至：<img src={require('../../../img/wechat.png')} alt=""  style={{margin: '0 15px'}}/>
                        </div>
                    </TabPane>
                    <TabPane tab="分享指定好友" key="2"  style={{fontSize: '12px', color: '#333'}}>
                        <p style={{marginBottom: '10px'}}>请选择组织架构</p>
                        <div style={{border: '1px solid #eee', padding: '10px', display: 'flex', borderRadius: '2px'}}>
                            <div style={{width: '50%', borderRight: '1px solid #eee', padding: '5px'}}>
                                <Input type='text'
                                       size='small'
                                       prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       placeholder='搜索'
                                />
                                <p style={{fontSize: '14px', fontWeight: 'bold', marginTop: '20px'}}>华泰证券</p>
                                <Tree
                                    checkable
                                    defaultExpandedKeys={[]}
                                    defaultSelectedKeys={[]}
                                    defaultCheckedKeys={[]}
                                    onSelect={this.onSelect}
                                    onCheck={this.onCheck}
                                >
                                    <TreeNode title="投资部" key="0-0">
                                        <TreeNode title="001部门" key="0-0-0" disabled>
                                            <TreeNode title="011部门" key="0-0-0-0" disableCheckbox />
                                            <TreeNode title="012部门" key="0-0-0-1" />
                                        </TreeNode>
                                        <TreeNode title="002部门" key="0-0-1">
                                            <TreeNode title={<span style={{ color: '#1890ff' }}>021部门</span>} key="0-0-1-0" />
                                        </TreeNode>
                                    </TreeNode>
                                    <TreeNode title="机构理财部" key="0-1">
                                        <TreeNode title="001部门" key="0-1-0" disabled>
                                            <TreeNode title="011部门" key="0-1-0-0" disableCheckbox />
                                            <TreeNode title="012部门" key="0-1-0-1" />
                                        </TreeNode>
                                        <TreeNode title="002部门" key="0-1-1">
                                            <TreeNode title={<span style={{ color: '#1890ff' }}>021部门</span>} key="0-1-1-0" />
                                        </TreeNode>
                                    </TreeNode>
                                    <TreeNode title="综合管理部" key="0-2">
                                    </TreeNode>
                                    <TreeNode title="市场部" key="0-3">
                                    </TreeNode>
                                    <TreeNode title="人力资源部" key="0-4">
                                    </TreeNode>
                                    <TreeNode title="信息技术部" key="0-5">
                                    </TreeNode>
                                </Tree>
                            </div>
                            <div style={{width: '50%', padding: '5px'}}>
                                <p style={{color: '#666', fontSize: '13px'}}>已选择了43个联系人</p>
                                <ul style={{margin: '20px 0'}}>
                                    {
                                        users.map((val, index) => {
                                            return <li key={index} style={{lineHeight: '40px', fontSize: '13px'}}>
                                                <img src={require('../../../img/userlogo.png')} alt="" style={{marginRight: '15px', width: '25px', position: 'relative', top: '-2px'}}/>
                                                {val.name}
                                                <p style={{float: 'right'}}>
                                                    <Icon type="close-circle"  style={{fontSize: '20px', color: '#999', position: 'relative', top: '5px'}}/>
                                                </p>
                                            </li>
                                        })
                                    }
                                </ul>
                                <div style={{float: 'right'}}>
                                    <Button size='small'
                                            onClick={() => this.setState({visible: false})}
                                            style={{fontSize: '13px', marginRight: '10px', padding: '0 25px'}}>取消</Button>
                                    <Button size='small'
                                            onClick={() => this.setState({visible: false})}
                                            type='primary' style={{fontSize: '13px', padding: '0 25px'}}>确定</Button>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Modal>
        </ShareComponent>
    }
}