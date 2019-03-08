import React from 'react';
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Drawer, Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const MyDrawer = styled(Drawer)`
    .comment{
        >li{
            margin-bottom: 20px;
            >div{
                padding: 5px 0;
                color: #333;
            }
        }
    }
    .logo{
        margin-right: 10px;
        border-radius: 50%;
    }
    .title{
        display: inline-block;
        position: relative;
        top: 12px;
        >span{
            display: block;
            line-height: 20px;
            &:nth-child(1){
                font-size: 14px;
            }
            &:nth-child(2){
                font-size: 12px;
                color:  #999;
            }
        }
    }
    .talk-btn{
        display: flex;
        line-height: 50px;
        >span{
            flex: 1;
            text-align: center;
            color: #407CD5;
            cursor: pointer;
        }
        >div{
            float: right;
            >img{
                cursor: pointer;
            }
        }
    }
    .user-logo{
        line-height: 50px;
        font-size: 14px
        >p{
            display: inline-block;
        }
        >span{
            float: right;
            color: #999;
            font-size: 12px
        }
    }
    .comment-content{
        margin: 15px 0;
        color: #999!important;
        line-height: 20px;
        margin: 6px 0 0;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        >span{
            display: inline-block;
            width: 3px;
            height: 13px;
            background: #407CD5;
            margin-right: 5px;
            position: relative;
            top: 2px;
        }
    }
`;

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: [
                {username: '王涛', date: '09-06 8:30', img: '', content: '今天工作很开心，哈哈哈', isGood: false, goodNum: 5,title: '', commentUser: '', commentContent: ''},
                {username: '尹少帅', date: '09-06 8:31', img: '', content: '今天要加班，哈哈哈', isGood: true, goodNum: 6, title: 'xxx工程师', commentUser: '王涛', commentContent: '今天工作很开心，哈哈哈'},
                {username: '戴建华', date: '09-06 8:31', img: '', content: '今天工作很开心，哈哈哈', isGood: false, goodNum: 7, title: 'xxx工程师', commentUser: '', commentContent: ''},
                {username: '李庭灿', date: '09-06 8:31', img: '', content: '今天要出差，哈哈哈', isGood: false, goodNum: 8, title: 'xxx工程师', commentUser: '', commentContent: ''},
            ]
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillReceiveProps(nextProps) {
    }

    setVisible = (visible) => {
        this.setState({visible});
    }


    render() {
        const {data} = this.state;
        return <MyDrawer
            width={380}
            onClose={() => this.setVisible(false)}
            visible={this.state.visible}
            destroyOnClose={true}
            className="side-drawer-popup"
            style={{
                overflow: 'auto',
                height: 'calc(100% - 108px)',
                paddingBottom: '108px'
            }}>
            <Tabs defaultActiveKey="1" onChange={this.callback} style={{padding: '10px'}}>
                <TabPane tab="评论" key="1" style={{fontSize: '12px', color: '#333'}}>
                    <ul className='comment'>
                        {
                            data.map((val, index) => {
                                return <li key={index}>
                                    <div className='user-logo'>
                                        <img src={require('../../../img/userlogo.png')} alt="" className='logo'/>
                                        <p className='title'>
                                            <span style={{position: 'relative', top: !val.title ? '-10px' : 0}}>{val.username}</span>
                                            <span>{val.title}</span>
                                        </p>
                                        <span>{val.date}</span>
                                    </div>
                                    {
                                        val.commentContent &&　<div className='comment-content'>
                                            <span></span>
                                            回复 {val.commentUser}: {val.commentContent}
                                        </div>
                                    }

                                    <div>{val.content}</div>
                                    <div className='talk-btn'>
                                        <span style={{visibility: !val.commentContent ? 'hidden' : 'visible'}}>删除评论</span>
                                        <div>
                                            <img src={val.isGood ? require('../../../img/good1.png') : require('../../../img/good.png')} alt=""/>
                                            <span style={{marginRight: '40px', color: '#97999C', marginLeft: '5px', position:  'relative', top: '2px'}}>{val.goodNum}</span>
                                            <img style={{marginRight: '40px'}} src={require('../../../img/talk.png')} alt=""/>
                                        </div>

                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </TabPane>
                <TabPane tab="批注" key="2" style={{fontSize: '12px', color: '#333'}}>

                </TabPane>
            </Tabs>
        </MyDrawer>
    }
}

Comment.propTypes = {};
export default Comment;