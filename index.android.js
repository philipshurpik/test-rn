'use strict';

var React = require('react-native');
var AnimatedTabs = require('./components/animated-tabs/AnimatedTabs.js');
var { AppRegistry, StyleSheet, Component, View, Text } = React;
var Dimensions = require('Dimensions');
const deviceHeight = Dimensions.get('window').height;

class ThingsDone extends Component {
    render() {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i + 1));
        var tabs = content.map(this.getPanelContent);

        return (
            <View style={styles.animatedView}>
                <AnimatedTabs tabBarLabels={content}>
                    {tabs}
                </AnimatedTabs>
            </View>
        );
    }

    getPanelContent(x, i) {
        return (
            <View key={i} style={styles.tabContent}>
                <Text>Content: {x}</Text>
            </View>
        )
    }
}

const HEADER_HEIGHT = 44;

var styles = StyleSheet.create({
    animatedView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    tabContent: {
        height: deviceHeight / 2 - HEADER_HEIGHT
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
