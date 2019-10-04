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
import {getSensors} from '../../../selectors/sensors';
import {fetchSensors} from '../../../actions/sensors';

import {getStatistics} from '../../../selectors/statistics';
import {fetchStatistics} from '../../../actions/statistics';

import {toPascalCase} from '../../../helpers/common.helper'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
    },
});

const mapStateToProps = (state) => {
    return {
        sensors: getSensors(state),
        statistics: getStatistics(state),
    };
}; 
@withStyles(styles)
@connect(mapStateToProps, {fetchSensors, fetchStatistics})
export default class Sensors extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        sensors: PropTypes.object.isRequired,
        statistics: PropTypes.object.isRequired,
        fetchSensors: PropTypes.func.isRequired,
        fetchStatistics: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.fetchSensors();
    }

    fetchSensors = async () => {
        // thunk
        await this.props.fetchSensors(); // waiting for request
        await this.props.fetchStatistics(); // waiting for request
    
        this.updateTimeout = setTimeout(this.fetchSensors, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    }

    render() {
        const {sensors, statistics, classes} = this.props;

        if (sensors.loading || statistics.loading) {
            return <PageSpinner/>;
        }
        
        if (sensors.sensorsFetchError || statistics.statisticsFetchError ) {
            return <LoadingFailed errorText={sensorFetchError}/>;
        }
        
        let data = [];
        for (var key in sensors.sensors) {
            data.push(
                {...sensors.sensors[key],
                avg: statistics.statistics[key].averageImpressionTime,
                count: statistics.statistics[key].impressionsCount
                }
            )
        };

        return (
            <>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                    <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell>Touch Point</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">AVG time spent</TableCell>
                                    <TableCell align="right">Overall Count</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map(row => (
                                    <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.title}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right">{row.avg}</TableCell>
                                    <TableCell align="right">{row.count}</TableCell>
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
