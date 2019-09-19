import React, {Component} from 'react';

import Divider from '@material-ui/core/Divider/Divider';
import CommonMenu from './CommonMenu';

export default class AppBarMenuItems extends Component {
    render() {
        return (
            <>
                <Divider/>
                <CommonMenu/>
            </>
        );
    }
};