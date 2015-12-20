"use strict";

var React = require('react-native');
var {View, Component, Text, StyleSheet} = React;
var Dimensions = require('Dimensions');
const deviceWidth = Dimensions.get('window').width;

class TasksPanel extends Component {
    render() {
        var todos = this.props.items.map((item, i) => (
            <Text key={i}>{item.text}</Text>
        ));

        return (
            <View style={[this.props.style, styles.panel]}>
                {todos}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    panel: {
        width: deviceWidth,
        backgroundColor: '#FFFFF9',
        padding: 15,
    }
});

module.exports = TasksPanel;