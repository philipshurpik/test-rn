'use strict';

var React = require('react-native');
var { View, Animated, Component, PanResponder, } = React;
var AnimatedTabsService = require('./AnimatedTabs.service.js');
var styles = require('./AnimatedTabs.styles.js');

const deviceWidth = require('Dimensions').get('window').width;
const MAX_ANIMATION_TIME = 700;
const SWIPE_THRESHOLD = deviceWidth / 3;
const ANIMATED_CONFIG = {
    tension: 25,
    friction: 6
};
const SIDE_OPACITY = 0.5;
const SIDE_SCALE = 0.8;

class AnimatedTabs extends Component {
    constructor(props) {
        super(props);

        var panels = this.props.children;
        var startIndex = this.props.startIndex || 0;
        var isCarousel = this.props.isCarousel || false;
        var indexes = AnimatedTabsService.init(panels, startIndex, isCarousel);

        this.state = {
            panels: panels,
            pan: new Animated.ValueXY(),
            previous: indexes.previous,
            current: indexes.current,
            next: indexes.next,
            animatedConfig: this.props.animatedConfig || ANIMATED_CONFIG
        };
    }

    componentWillReceiveProps (newProps) {
        if (this.state.silent) {
            return;
        }

        if (newProps.selectedIndex !== this.state.current) {
            this.state.silent = true;
            this._goToPanel(newProps.selectedIndex);
        }
    }

    componentWillMount() {
        var view = this;
        view._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderMove: Animated.event([
                null, {dx: view.state.pan.x}
            ]),

            onPanResponderRelease: () => {
                view.state.pan.flattenOffset();
                let isLeftDirection = view.state.pan.x._value > 0;
                let canMove = AnimatedTabsService.canMove(isLeftDirection);

                if (Math.abs(view.state.pan.x._value) > SWIPE_THRESHOLD && canMove) {
                    view._animateToPanel(isLeftDirection);
                } else {
                    view._cancelAnimation();
                }
            }
        });
    }

    render() {
        var panels = [
            this._getSidePanel(this.state.panels[this.state.previous]),
            this._getMainPanel(this.state.panels[this.state.current]),
            this._getSidePanel(this.state.panels[this.state.next])
        ];

        return (
            <View style={styles.container}>
                {panels}
            </View>
        );
    }

    _goToPanel(newIndex) {
        var isLeftDirection = newIndex < this.state.current;
        var indexes = AnimatedTabsService.forceMoveToIndex(newIndex);

        this.setState(indexes);
        this._animateToPanel(isLeftDirection);
    }

    _animateToPanel(isLeftDirection) {
        this.state.nextX = isLeftDirection ? deviceWidth : -deviceWidth;
        this.state.animatedConfig.toValue = {x: this.state.nextX, y: 0};

        Animated.spring(this.state.pan, this.state.animatedConfig).start(this._resetState.bind(this));

        setTimeout(() => this.state.pan.stopAnimation(), MAX_ANIMATION_TIME);
    }

    _resetState() {
        var indexes = this.state.nextX < 0 ? AnimatedTabsService.moveNext() : AnimatedTabsService.movePrevious();

        this.state.pan.setValue({x: 0, y: 0});
        this.setState(indexes);
        this.state.silent = false;
    }

    _cancelAnimation() {
        this.state.animatedConfig.toValue = {x: 0, y: 0};
        Animated.spring(this.state.pan, this.state.animatedConfig).start();
    }

    _getSidePanel(panelContent) {
        return this._getPanel(panelContent, [1, SIDE_OPACITY, 1], [1, SIDE_SCALE, 1]);
    }

    _getMainPanel(panelContent) {
        return this._getPanel(panelContent, [SIDE_OPACITY, 1, SIDE_OPACITY], [SIDE_SCALE, 1, SIDE_SCALE]);
    }

    _getPanel(panelContent, opacityRange, scaleRange) {
        let x = this.state.pan.x;
        let opacity = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: opacityRange});
        let scale = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: scaleRange});
        let animateStyles = {transform: [{translateX: x}, {scale}], opacity};
        let contentStyles = panelContent ? styles.contentPanel : null;

        return (
            <Animated.View style={[styles.panel, contentStyles, animateStyles]} {...this._panResponder.panHandlers}>
                {panelContent}
            </Animated.View>
        );
    }
}

module.exports = AnimatedTabs;