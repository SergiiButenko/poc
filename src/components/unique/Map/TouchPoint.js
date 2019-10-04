import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const styles = theme => ({
    circleBackground: {
      stroke: '#ddd',
      fill: 'green'
    },
    circleText: {
      fontSize: '1em',
      fontWeight: 'bold',
      fill: 'white',
    }
});


@withStyles(styles)
export default class TouchPoint extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      const {classes, data} = this.props;

      // Size of the enclosing square
      const sqSize = this.props.sqSize;
      // SVG centers the stroke width on the radius, subtract out so circle fits in square
      const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
      // Enclose cicle in a circumscribing square
      const viewBox = `0 0 ${sqSize} ${sqSize}`;
      // Arc length at 100% coverage is the circle circumference
      const dashArray = radius * Math.PI * 2;
      // Scale 100% coverage overlay with the actual percent
      const dashOffset = dashArray - dashArray * this.props.percentage / 100;
  
      return (
        <>
        <Typography variant="h6" align="center">
            {data.title}
            </Typography>
        <svg
            width={this.props.sqSize}
            height={this.props.sqSize}
            viewBox={viewBox}>
            <circle
              className={classes.circleBackground}
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`} />
            <text
              className={classes.circleText}
              x="50%"
              y="50%"
              dy=".3em"
              textAnchor="middle">
              {`${data.avg} / ${data.count}`}
            </text>
        </svg>
        </>
      );
    }
  }
  