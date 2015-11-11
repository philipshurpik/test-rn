'use strict';

var React = require('react-native');
var Button = require('./Button');
var AnimatedTabs = require('./AnimatedTabs');
var {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    } = React;

var ThingsDone = React.createClass({
    render: function () {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i+1));
        var tabs = content.map(x => (<View><Text>{x}</Text></View>));

        return (
            <View style={styles.container}>
                <AnimatedTabs>
                    {tabs}
                </AnimatedTabs>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
