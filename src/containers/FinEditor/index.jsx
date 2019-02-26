import React from 'react';
import Editor from '../../components/Editor2';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

const FinEditorWrapper = styled.div`
    flex: auto;
    margin-left: -1px;
`;

// @inject('editorStore')
// @observer
export default class FinEditor extends React.Component {
    constructor(props) {
        super(props);

    }

    
    render() {
        return <FinEditorWrapper>
            <Editor></Editor>
        </FinEditorWrapper>
    }
}