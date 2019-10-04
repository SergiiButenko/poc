import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PageSpinner from '../../shared/PageSpinner';
import LoadingFailed from '../../shared/LoadingFailed';
import {getVisits} from '../../../selectors/visits';
import {fetchVisits} from '../../../actions/visits';

import { getSensors } from '../../../selectors/sensors';
import { fetchSensors } from '../../../actions/sensors';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
});

const mapStateToProps = (state) => {
    return {
        visits: getVisits(state),
        sensors: getSensors(state),
    };
}; 
@withStyles(styles)
@connect(mapStateToProps, {fetchVisits, fetchSensors})
export default class Visits extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        visits: PropTypes.object.isRequired,
        sensors: PropTypes.bool.isRequired,
        fetchVisits: PropTypes.func.isRequired,
        fetchSensors: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.fetchVisits();
    }

    fetchVisits = async () => {
        // thunk
        await this.props.fetchVisits(); // waiting for request
        await this.props.fetchSensors(); // waiting for request
    
        this.updateTimeout = setTimeout(this.fetchVisits, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    }

    render() {
        const {sensors, visits, classes} = this.props;

        if (sensors.loading || sensors.loading) {
            return <PageSpinner/>;
        }  
        if (visits.visitsFetchError || sensors.sensorsFetchError) {
            return <LoadingFailed errorText={visits.visitsFetchError || sensors.sensorsFetchError}/>;
        }

        let data = [];
        for (var key in visits.visits) {
            let visit = visits.visits[key]
            
            let newPath = []
            visit.path.split(',').forEach(
                item => {
                    sensors.sensors[item] && newPath.push(sensors.sensors[item].title)
                }
            )

            data.push({...visit,
                path: newPath.join(', ')
                }
            )
        };

        console.log(data)
        return (
            <>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Smart Printer</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Path</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map(row => (
                                    <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {1}
                                    </TableCell>
                                    <TableCell>{'' + row.timestamp}</TableCell>
                                    <TableCell>{row.path}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
                
            </>
        );
    }
}
