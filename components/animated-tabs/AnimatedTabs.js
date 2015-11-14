'use strict';

var React = require('react-native');
var { View, Animated, Component, PanResponder, } = React;
var AnimatedTabsService = require('./AnimatedTabs.service.js');
var styles = require('./AnimatedTabs.styles.js');

const deviceWidth = require('Dimensions').get('window').width;
const SWIPE_THRESHOLD = deviceWidth / 3;

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
            next: indexes.next
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

                if (Math.abs(view.state.pan.x._value) > SWIPE_THRESHOLD) {
                    let isLeftDirection = view.state.pan.x._value > 0;
                    view._animateToPanel(isLeftDirection);
                } else {
                    Animated.spring(view.state.pan, {
                        toValue: {x: 0, y: 0},
                        tension: 10
                    }).start()
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
        let nextX = isLeftDirection ? deviceWidth : -deviceWidth;

        Animated.spring(this.state.pan, {
            toValue: {x: nextX, y: 0},
            tension: 10
        }).start(this._resetState.bind(this, nextX));
    }

    _resetState(nextX) {
        var indexes = nextX < 0 ? AnimatedTabsService.moveNext() : AnimatedTabsService.movePrevious();

        this.state.pan.setValue({x: 0, y: 0});
        this.setState(indexes);
        this.state.silent = false;
    }

    _getPanel(panelContent, panelStyles) {
        return (
            <Animated.View style={[styles.card, panelStyles]} {...this._panResponder.panHandlers}>
                {panelContent}
            </Animated.View>
        );
    }

    _getSidePanel(panelContent) {
        let x = this.state.pan.x;
        let opacity = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: [1, 0.5, 1]});
        let scale = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: [1, 0.8, 1]});
        let animatedCardStyles = {transform: [{translateX: x}, {scale}], opacity};

        return this._getPanel(panelContent, animatedCardStyles);
    }

    _getMainPanel(panelContent) {
        let x = this.state.pan.x;
        let opacity = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: [0.5, 1, 0.5]});
        let scale = x.interpolate({inputRange: [-deviceWidth, 0, deviceWidth], outputRange: [0.8, 1, 0.8]});
        let animatedCardStyles = {transform: [{translateX: x}, {scale}], opacity};

        return this._getPanel(panelContent, animatedCardStyles);
    }
}

module.exports = AnimatedTabs;