import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import PageSpinner from '../../shared/PageSpinner';
import TouchPoint from './TouchPoint'
import LoadingFailed from '../../shared/LoadingFailed';
import {getSensors} from '../../../selectors/sensors';
import {fetchSensors} from '../../../actions/sensors';
import {getStatistics} from '../../../selectors/statistics';
import {fetchStatistics} from '../../../actions/statistics';

import map from './map.png';

const styles = theme => ({
    container: {
        position: 'relative',  
    },
    map: {
        opacity: '0.5',
        // maxHeight: '100%',
        // maxWidth: '80%',
    },
    touchpoint1: {
        position: 'absolute',
        top: '290px',
        left: '580px',
    },
    touchpoint2: {
        position: 'absolute',
        top: '70px',
        left: '780px',
    },
    touchpoint3: {
        position: 'absolute',
        top: '500px',
        left: '100px',
    },
    touchpoint4: {
        position: 'absolute',
        top: '500px',
        left: '500px',
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
export default class Map extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        sensors: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        sensorsFetchError: PropTypes.any,
        fetchSensors: PropTypes.func.isRequired,
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
            return <LoadingFailed errorText={sensors.sensorsFetchError || statistics.statisticsFetchError}/>;
        }
        
        let data = {};
        for (var key in sensors.sensors) {
            data[key] = {...sensors.sensors[key],
                avg: statistics.statistics[key].averageImpressionTime,
                count: statistics.statistics[key].impressionsCount
                }
        };

        return (
            <>
            <div className={classes.container}>
                <img src={map} width="100%" height="auto" className={classes.map}/>
                <div className={classes.touchpoint1}>
                    <TouchPoint
                    strokeWidth="5"
                    sqSize="100"
                    data={data[1]}
                    />
                </div>
                <div className={classes.touchpoint2}>
                    <TouchPoint
                    strokeWidth="5"
                    sqSize="100"
                    data={data[2]}
                    />
                </div>
                <div className={classes.touchpoint3}>
                    <TouchPoint
                    strokeWidth="5"
                    sqSize="100"
                    data={data[3]}
                    />
                </div>
                <div className={classes.touchpoint4}>
                    <TouchPoint
                    strokeWidth="5"
                    sqSize="100"
                    data={data[4]}
                    />
                </div>
                
            </div>
                
            </>
        );
    }
}
