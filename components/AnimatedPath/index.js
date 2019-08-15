import React, {
  PureComponent, Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
} from 'react-native';
import {
  svgPathProperties,
} from 'svg-path-properties';

import Path from '../AnimatedSVG';

const { height, width } = Dimensions.get('window');
class AnimatedSvgPaths extends Component {
  static propTypes = {
    d: PropTypes.string.isRequired,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    duration: PropTypes.number,
    height: PropTypes.number,
    delay: PropTypes.number,
    width: PropTypes.number,
    scale: PropTypes.number,
    loop: PropTypes.bool
  };
  
  static defaultProps = {
    strokeColor: "black",
    strokeWidth: 1,
    duration: 1000,
    delay: 1000,
    fill: "none",
    scale: 1,
    height,
    width,
    loop: true
  };
  
  constructor(props) {
    super(props);
    const { d } = this.props;
    const properties = svgPathProperties(d)
    this.length = properties.getTotalLength();
    this.strokeDashoffset = new Animated.Value(this.length);
  }
  
  animate = () => {
    const {
      delay,
      duration,
      loop
    } = this.props;
    this.strokeDashoffset.setValue(this.length);
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this.strokeDashoffset, {
        delay: delay,
        toValue: 0,
        duration: duration,
        useNativeDriver: true
      })
    ]).start(() => {
      if (loop) {
        this.animate();
      }
    });

  }

  start(strokeDashoffset){

  }

  componentDidMount() {
    const {
      delay,
    } = this.props;
    setTimeout(this.animate(), delay)

  }
  
  render() {
    const {
      d,
      fill,
      scale,
      width,
      height,
      strokeColor,
      strokeWidth,
    } = this.props;
    return (
      <Path
        strokeDasharray={[this.length, this.length]}
        strokeDashoffset={this.strokeDashoffset}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        scale={scale}
        fill={fill}
        d={d}
      />
    );
  }
}

/* Export ==================================================================== */

module.exports = AnimatedSvgPaths;
module.exports.details = {
  title: 'AnimatedSvgPaths',
};