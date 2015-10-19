'use strict';

var React = require('react-native');
var {
    Animated,
    StyleSheet,
    Text,
    View,
    } = React;

var deviceWidth = require('Dimensions').get('window').width;

var AnimatedTabs = React.createClass({
    propTypes: {
        page: React.PropTypes.number
    },
    getInitialState: function() {
        var animatedValue = new Animated.Value(0);
        return {
            animatedValue: animatedValue,
            animatedStyles: this.getStyles(animatedValue)
        }
    },
    componentWillReceiveProps: function() {
        Animated.spring(this.state.animatedValue, {
            toValue: (this.props.page) % 5,
            velocity: 3
        }).start()
    },
    getStyles: function(animatedValue) {
        return [styles.tabView, {
            transform: [{
                translateX: animatedValue.interpolate({
                    inputRange: [0, 5],
                    outputRange: [0, deviceWidth * 5]
                })
            }]
        }];
    },
    render: function () {
        return (
            <Animated.View style={this.state.animatedStyles}>
                <View style={styles.card}>
                    <Text>Make plans</Text>
                </View>
            </Animated.View>
        );
    }
});

var styles = StyleSheet.create({
    tabView: {
        width: deviceWidth,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3
    }
});

module.exports = AnimatedTabs;
