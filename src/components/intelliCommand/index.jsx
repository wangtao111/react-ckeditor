import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import {tables, MENTIONS} from '../../mockData/commandData'
const IntelliCommandWrapper = styled.div`
    overflow: hidden;
    padding-bottom: 2px;
    h2 {
        color: #333;
        font-size: 14px;
        font-weight: normal;
        padding: 12px 0;
        padding-left: 13px;
        border-bottom: 1px solid #eee;
    }
    #command_tag_list{
        display: none;
        position: absolute;
        border: 1px solid #ddd;
        border-radius: 2px;
        background: #fff;
        font-size: 12px;
        white-space: nowrap;
        >ul>li{
            padding: 3px 20px;
            cursor: pointer;
            &:hover{
                background: #dbe9f9;
                color: #82abe5;
            }
        }
    }
    .close{
        color: #bbb;
        float: right;
        margin-right: 20px;
        font-size: 16px;
        margin-top: 15px;
        cursor: pointer;
        &:hover{
            color: #666;
        }
    }
    .editable-cmd-content {
        min-height: 205px;
        padding: 10px 10px 10px 40px;
        margin: 8px;
        background-color: #F5F5F5;
        position: relative;
        overflow: hidden;
        white-space: pre-wrap;
        word-break: break-all;
        font-family: "Lucida Console", Consolas, Monaco;

        &:focus {
            outline: none;
        }

        &::before {
            content: "1\\A 2\\A 3\\A 4\\A 5\\A 6\\A 7\\A 8\\A 9\\A 10\\A 11\\A 12\\A 13\\A 14\\A 15\\A 16\\A 17\\A 18\\A 19\\A 20\\A 21\\A 22\\A 23\\A 24\\A 25\\A 26\\A 27\\A 28\\A 29\\A 30\\A ";
            color: #999;
            position: absolute;
            top: 10px;
            bottom: 10px;
            left: 0;
            text-align: right;
            background-color: #fbfbfb;
            outline: 100px solid #fbfbfb;
            clip: rect(-100px 2em 9999px 0);
            /* IE9+ */
            clip: rect(-100px 3.5ch 9999px 0);
            overflow: hidden;
        }
    }

    .btn-exec-cmd {
        float: right;
        color: #417CD5;
        margin-right: 20px;
        width: 70px;
        height: 30px;
        border-radius: 4px;
        box-shadow: 0px 2px 5px 0px rgba(74, 144, 226, 0.31);
        border: 1px solid rgba(219, 233, 249, 1);
    }
`;

export default class IntelliCommand extends React.Component {
    constructor(props) {
        super(props);
        this.position = null;
        this.range = null;
        this.state = {
            dropList: [],
            dropIndex: 0
        }
    }

    componentDidMount() {
    }

    keyUp = (e) => {
        const range = window.getSelection().getRangeAt(0), text = range.endContainer.textContent;
        const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let position = range.getBoundingClientRect(), menu = document.getElementById('command_tag_list');
        this.range = range;
        if(menu.style.display === 'block') {
            const keyCode = parseInt(e.keyCode)
            if(keyCode === 38){
                if(this.state.dropIndex === 0) {
                    this.setState({dropIndex: this.state.dropList.length - 1});    
                } else {
                    this.setState({dropIndex: this.state.dropIndex - 1});
                }
                return;
            }
            if(keyCode === 40){
                if(this.state.dropIndex === this.state.dropList.length - 1) {
                    this.setState({dropIndex: 0});    
                } else {
                    this.setState({dropIndex: this.state.dropIndex + 1});
                }
                return;
            }
            if(keyCode === 13) {
                this.templateClick(this.state.dropList[this.state.dropIndex]);
                menu.style.display === 'none';
                return;
            }
        }
        if(text.charAt(text.length - 1) === '~' || text.charAt(text.length - 1) ==='～') {
            this.position = position;
        }
        if (text.indexOf('~') !== -1 || text.indexOf('～') !== -1) {
            this.setState({dropList: MENTIONS});
            menu.style.display = 'block';
            setTimeout(() => {
                const menu = document.getElementById('command_tag_list');
                if(position.x + menu.offsetWidth >= document.body.offsetWidth){
                    position.x = document.body.offsetWidth - menu.offsetWidth - 10
                }
                menu.style.left = position.left + scrollX + 'px';
                menu.style.top = position.top + scrollY + 14 + 'px';
            })
        } else if(range.endContainer.parentElement.className === 'temporary') {
            const index = text.lastIndexOf('.');
            if(index !== -1) {
                this.setState({dropList: tables});
                menu.style.display = 'block';
                setTimeout(() => {
                    const menu = document.getElementById('command_tag_list');
                    if(position.x + menu.offsetWidth >= document.body.offsetWidth){
                        position.x = document.body.offsetWidth - menu.offsetWidth - 10
                    }
                    menu.style.left = position.left + scrollX + 'px';
                    menu.style.top = position.top + scrollY + 14 + 'px';
                })
            } else {
                menu.style.display = 'none';
            }
        } else {
            menu.style.display = 'none';
        }
    }
    keyDown = (e) => {
        const menu = document.getElementById('command_tag_list');
        const keyCode = parseInt(e.keyCode)
        if(menu.style.display === 'block') {
            if(keyCode === 38 || keyCode === 40 || keyCode === 13){
                e.preventDefault()
            }
        }
    }
    templateClick = (li) => {
        const range = this.range,
            menu = document.getElementById('command_tag_list'),
            text = range.endContainer.textContent,
            index = text.lastIndexOf('.');
        let offset = 1;
        if(range.endContainer.parentElement.className === 'temporary' && index !== -1) {
            offset = index + 1;
        }
        range.setStart(range.endContainer, offset);
        range.deleteContents();
        const node = document.createElement('span');
        node.innerHTML = li.tag
        range.insertNode(node);
        range.collapse();
        menu.style.display = 'none';
    }

    render() {
        const {dropList, dropIndex} = this.state;
        return <IntelliCommandWrapper>
            <Icon type='close' className='close' onClick={() => {this.props.closeCallback()}}></Icon>
            <h2>智能命令</h2>

            <div className="editable-cmd-content" id='editable-cmd-content' contentEditable={ true } onKeyUp={(e) => {this.keyUp(e)}} onKeyDown={(e) => {this.keyDown(e)}}>
            </div>

            <Button className="btn-exec-cmd">运行</Button>
            <div id="command_tag_list">
                <ul>
                    {
                        dropList.map((li, index) => {
                            return <li key={index} style={{background: dropIndex === index ? '#eff0ef': 'inherit'}} onClick={() => {this.templateClick(li)}}>{li.title}</li>
                        })
                    }
                </ul>
            </div>
        </IntelliCommandWrapper>
    }
}