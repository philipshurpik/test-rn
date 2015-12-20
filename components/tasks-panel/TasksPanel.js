"use strict";

var React = require('react-native');
var {View, Component, Text, StyleSheet} = React;
var Dimensions = require('Dimensions');
const deviceHeight = Dimensions.get('window').height;

class TasksPanel extends Component {
    render() {
        return (
            <View style={[this.props.style, styles.panel]}>
                <Text>{this.props.content}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    panel: {
        backgroundColor: '#FFFFF9',
        padding: 15,
    }
});

module.exports = TasksPanel;