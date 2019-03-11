import React from 'react';
import { Input } from 'antd';

export default class CustomInput extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.select();
    }

    render() {
        return <Input { ...this.props } ref={ this.inputRef }></Input>
    }
}