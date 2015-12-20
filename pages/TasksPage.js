'use strict';

var React = require('react-native');
var AnimatedTabs = require('../components/animated-tabs/AnimatedTabs.js');
var TasksPanel = require('../components/tasks-panel/TasksPanel.js');
var TasksHeader = require('../components/tasks-panel/TasksHeader.js');
var tasksData = require('./tasksData.js');

var { StyleSheet, Component, View } = React;
var Dimensions = require('Dimensions');
const deviceHeight = Dimensions.get('window').height;

class TasksPage extends Component {
    render() {
        var tabs = tasksData.daysData.map((item, i) => {
            return (<TasksPanel key={i} style={styles.tabContent} items={item.items}></TasksPanel>);
        });
        var tabLabels = tasksData.daysData.map(item => item.header);

        return (
            <View style={this.props.style}>
                <AnimatedTabs tabBarLabels={tabLabels} tabBarStyle='headerTitle'>
                    {tabs}
                </AnimatedTabs>
                <TasksHeader>
                </TasksHeader>
                <TasksPanel style={styles.tabContent} items={tasksData.todoItems}>
                </TasksPanel>
            </View>
        );
    }
}

const HEADER_HEIGHT = 44;

var styles = StyleSheet.create({
    tabContent: {
        height: deviceHeight / 2 - HEADER_HEIGHT - 6
    }
});

module.exports = TasksPage;