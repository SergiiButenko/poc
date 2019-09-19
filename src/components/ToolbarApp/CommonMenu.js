import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Face from '@material-ui/icons/Face';

import {Link} from 'react-router-dom';
import List from '@material-ui/core/List/List';

export default class CommonMenu extends Component {
    render() {
        const {user} = this.props;

        return (
            <List>
                <ListItem component={Link} to="/" button>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Map"/>
                </ListItem>

                <ListItem component={Link} to="/devices" button>
                    <ListItemIcon>
                        <Face/>
                    </ListItemIcon>
                    <ListItemText primary="Devices"/>
                </ListItem>
            </List>
        );
    }
}