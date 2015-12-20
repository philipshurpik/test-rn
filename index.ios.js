'use strict';

var React = require('react-native');
var TasksPage = require('./pages/TasksPage.js');
var { AppRegistry, StyleSheet, Component, View } = React;

class ThingsDone extends Component {
    render() {
        return (
            <TasksPage style={styles.animatedView}></TasksPage>
        );
    }
}

const VIEW_TOP = 22;

var styles = StyleSheet.create({
    animatedView: {
        top: VIEW_TOP,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
