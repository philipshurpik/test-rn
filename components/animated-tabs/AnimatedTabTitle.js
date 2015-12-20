'use strict';

var React = require('react-native');
var { Component, View, StyleSheet, Text, TouchableOpacity } = React;
var AnimatedTabBarLabel = require('./AnimatedTabBarLabel.js');
var Dimensions = require('Dimensions');
const deviceWidth = Dimensions.get('window').width;

class AnimatedTabTitle extends Component {
    render() {
        var index = this.props.currentIndex;
        var tabs = this.props.children;
        if (!tabs || !tabs.length) {
            return null;
        }

        var label = tabs[index];
        var previous = index > 0 ? this.getTabNavigation(index - 1, '<<') : this.getEmptyButton();
        var next = index < tabs.length - 1 ? this.getTabNavigation(index + 1, '>>') : this.getEmptyButton();

        return (
            <View style={styles.tabHeader}>
                {previous}
                <View style={[styles.title, styles.center]}><Text style={[styles.text]}>{label}</Text></View>
                {next}
            </View>
        )
    }

    getTabNavigation(index, text) {
        return (
            <TouchableOpacity style={[styles.nav, styles.center]} onPress={() => {this.props.onLabelPress(index)}}>
                <Text style={[styles.text]}>{text}</Text>
            </TouchableOpacity>
        )
    }

    getEmptyButton() {
        return (<Text style={[styles.nav]}> </Text>);
    }
}

AnimatedTabTitle.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.string),
    currentIndex: React.PropTypes.number.isRequired,
    onLabelPress: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    tabHeader: {
        flex: 1,
        flexDirection: 'row',
        top: 0,
        left: deviceWidth,
        height: 44,
        width: deviceWidth,
        backgroundColor: '#55B7E6'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    nav: {
        flex: 1
    },
    title: {
        flex: 4
    }
});


module.exports = AnimatedTabTitle;