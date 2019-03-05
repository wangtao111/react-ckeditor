import React from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';

const AppHeader = styled.header`
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #407CD5;

    h1 {
        display: inline-block;
        color: inherit;
        font-size: 19px;
        padding-left: 53px;
        font-weight: normal;
    }

    .operation-mode {
        display: inline-block;
        margin-left: 45px;

        .ant-radio-button-wrapper {
            border-radius: 2px;
            height: 24px;
            line-height: 24px;
            width: 60px;
        }
    }
`
export default class Header extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <AppHeader>
            <h1>金融云笔记</h1>
            <div className="operation-mode">
                <Radio.Group defaultValue="normal" buttonStyle="solid">
                    <Radio.Button value="normal">普通</Radio.Button>
                    <Radio.Button value="edit">编辑</Radio.Button>
                </Radio.Group>
            </div>
        </AppHeader>
    }
}