"use strict";

var React = require('react-native');
var {View, Component, Text, StyleSheet} = React;
var Dimensions = require('Dimensions');
const deviceWidth = Dimensions.get('window').width;

class TasksHeader extends Component {
    render() {
        return (
            <View style={[styles.header]}>
                <Text style={styles.text}>TODO List</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    header: {
        width: deviceWidth,
        height: 34,
        backgroundColor: '#55B7E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }
});

module.exports = TasksHeader;