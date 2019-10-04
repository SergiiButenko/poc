import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Navigation from '@material-ui/icons/Navigation';
import DevicesOther from '@material-ui/icons/DevicesOther';

import {Link} from 'react-router-dom';
import List from '@material-ui/core/List/List';

import Divider from '@material-ui/core/Divider/Divider';

export default class AppBarMenuItems extends Component {
    render() {
        return (
            <>
                <List>
                <ListItem component={Link} to="/" button>
                    <ListItemIcon>
                    <Navigation/>
                    </ListItemIcon>
                    <ListItemText primary="Map"/>
                </ListItem>
                
                <Divider/>
                
                <ListItem component={Link} to="/sensors" button>
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Sensors"/>
                </ListItem>

                <ListItem component={Link} to="/visits" button>
                    <ListItemIcon>
                        <DevicesOther/>
                    </ListItemIcon>
                    <ListItemText primary="Visits"/>
                </ListItem>
            </List>
            </>
        );
    }
};