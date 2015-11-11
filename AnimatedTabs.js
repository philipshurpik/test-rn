'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View, Animated, Component, PanResponder, } = React;
var deviceWidth = require('Dimensions').get('window').width;
var deviceHeight = require('Dimensions').get('window').height;

var SWIPE_THRESHOLD = deviceWidth / 2;

class AnimatedTabs extends Component {
    constructor(props) {
        super(props);

        var panels = this.props.children;

        this.state = {
            pan: new Animated.ValueXY(),
            panel: panels[0],
            nextPanel: panels[1],
            previousPanel: panels[panels.length - 1]
        }
    }

    _goToPreviousPanel() {
        let panels = this.props.children;

        let currentPanelIdx = panels.indexOf(this.state.panel);
        let prePrevIdx = currentPanelIdx - 2;
        let prevIdx = currentPanelIdx - 1;

        this.setState({
            previousPanel: panels[prePrevIdx >= 0 ? prePrevIdx : panels.length - Math.abs(prePrevIdx)],
            panel: panels[prevIdx >= 0 ? prevIdx : panels.length - Math.abs(prevIdx)],
            nextPanel: panels[currentPanelIdx]
        });
    }

    _goToNextPanel() {
        let panels = this.props.children;

        let currentPanelIdx = panels.indexOf(this.state.panel);
        let newIdx = currentPanelIdx + 1;
        newIdx = newIdx > panels.length - 1 ? 0 : newIdx;
        let nextIdx = newIdx + 1 > panels.length - 1 ? 0 : newIdx + 1;

        this.setState({
            previousPanel: panels[currentPanelIdx],
            panel: panels[newIdx],
            nextPanel: panels[nextIdx]
        });
    }

    _resetState(nextX) {
        this.state.pan.setValue({x: 0, y: 0});
        if (nextX < 0) {
            this._goToNextPanel();
        }
        else {
            this._goToPreviousPanel();
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
                    let nextX = view.state.pan.x._value > 0 ? deviceWidth : -deviceWidth;

                    Animated.spring(view.state.pan, {
                        toValue: {x: nextX, y: 0},
                        deceleration: 0.98
                    }).start(view._resetState.bind(view, nextX))
                } else {
                    Animated.spring(view.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }

    render() {
        var panels = [
            this._getSidePanel(this.state.previousPanel),
            this._getMainPanel(this.state.panel),
            this._getSidePanel(this.state.nextPanel)
        ];

        return (
            <View style={styles.container}>
                {panels}
            </View>
        );
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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 44,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
    },
    card: {
        width: deviceWidth,
        height: deviceHeight / 2.5,
        padding: 15,
        borderColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#000',
        shadowOffset: {height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 10
    }
});

module.exports = AnimatedTabs;