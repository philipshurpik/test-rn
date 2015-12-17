'use strict';

var React = require('react-native');
var { Component, Animated } = React;
var styles = require('./AnimatedTabs.styles.js');

const deviceWidth = require('Dimensions').get('window').width;
const SIDE_OPACITY = 0.5;
const SIDE_SCALE = 0.8;

class AnimatedTabPanel extends Component {
    render() {
        var animateStyles = {
            transform: [{translateX: this.props.x}, {scale: this.getScale()}],
            opacity: this.getOpacity(),
            shadowOpacity: this.getShadowOpacity()
        };
        var contentStyles = this.props.children ? styles.contentPanel : null;
        var panelStyles = [styles.panel, contentStyles, animateStyles];

        return (
            <Animated.View style={panelStyles} {...this.props.panHandlers}>
                {this.props.children}
            </Animated.View>
        );
    }

    getOpacity() {
        var opacityRange = this.props.isMain ? [SIDE_OPACITY, 1, SIDE_OPACITY] : [1, SIDE_OPACITY, 1];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: opacityRange});
    }

    getShadowOpacity() {
        var shadowRange = this.props.isMain ? [0.7, 0, 0.7] : [0, 0.7, 0];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: shadowRange});
    }

    getScale() {
        var scaleRange = this.props.isMain ? [SIDE_SCALE, 1, SIDE_SCALE] : [1, SIDE_SCALE, 1];
        return this.props.x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: scaleRange});
    }
}


module.exports = AnimatedTabPanel;