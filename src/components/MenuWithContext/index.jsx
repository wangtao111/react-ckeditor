import React from 'react';
import { Dropdown } from 'antd';

export default class MenuWithContext extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { contextMenus, children } = this.props;

        return <React.Fragment>
            <Dropdown overlay={ contextMenus } trigger={['contextMenu']}>
                { children }
            </Dropdown>
        </React.Fragment>
    }
}