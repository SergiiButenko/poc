import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import PageSpinner from '../shared/PageSpinner';
import LoadingFailed from '../shared/LoadingFailed';
import Button from '@material-ui/core/es/Button/Button';
import {getDevices} from '../../selectors/devices';
import {fetchDevices} from '../../actions/device';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
    },
});

const mapStateToProps = (state) => {
    return getDevices(state);
};
@withStyles(styles)
@connect(mapStateToProps, {fetchDevices})
export default class Devices extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        devices: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        deviceFetchError: PropTypes.any,
    };

    componentDidMount() {
        this.props.fetchDevices();
    }

    render() {
        const {loading, groupFetchError, devices} = this.props;

        if (loading) {
            return <PageSpinner/>;
        }

        if (groupFetchError) {
            return <LoadingFailed errorText={groupFetchError}/>;
        }

        return (
            <>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Button>
                            Назад
                        </Button>
                    </Grid>
                    {
                        Object.keys(devices).map(function (id, index) {
                            return (
                                <Grid item xs={12}>
                                    {JSON.stringify(devices[id], null, 2)}
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </>
        );
    }
}
