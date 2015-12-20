'use strict';

var React = require('react-native');
var AnimatedTabs = require('./components/animated-tabs/AnimatedTabs.js');
var TasksPanel = require('./components/tasks-panel/TasksPanel.js');
var { AppRegistry, StyleSheet, Component, View, Text } = React;
var Dimensions = require('Dimensions');
const deviceHeight = Dimensions.get('window').height;

class ThingsDone extends Component {
    render() {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i + 1));
        var tabs = content.map((x, i) => {
            return (<TasksPanel key={i} style={styles.tabContent} content={"Content: " + x }></TasksPanel>);
        });

        return (
            <View style={styles.animatedView}>
                <AnimatedTabs tabBarLabels={content}>
                    {tabs}
                </AnimatedTabs>
                <TasksPanel style={styles.tabContent} content='very big content'></TasksPanel>
            </View>
        );
    }
}

const HEADER_HEIGHT = 44;
const VIEW_TOP = 22;

var styles = StyleSheet.create({
    animatedView: {
        top: VIEW_TOP,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabContent: {
        height: deviceHeight / 2 - HEADER_HEIGHT - VIEW_TOP
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
