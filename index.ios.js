'use strict';

var React = require('react-native');
var Button = require('./Button');
var AnimatedTabs = require('./AnimatedTabs');
var {
    AppRegistry,
    StyleSheet,
    View,
    } = React;

var ThingsDone = React.createClass({
    getInitialState: function() {
        return {
            page: 1
        };
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Button onPress={this.onNextPage}>
                    Press to Fling it!
                </Button>
                <AnimatedTabs page={this.state.page}></AnimatedTabs>
            </View>
        );
    },
    onNextPage: function() {
        this.setState({page: ++this.state.page});
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
