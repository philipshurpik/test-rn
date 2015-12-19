'use strict';

var React = require('react-native');
var Button = require('./components/Button.js');
var AnimatedTabs = require('./components/animated-tabs/AnimatedTabs.js');
var {
    AppRegistry,
    StyleSheet,
    Component,
    View,
    Text,
    } = React;

class ThingsDone extends Component {
    render() {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i+1));
        var tabs = content.map((x, i) => (<View key={i}><Text>{x}</Text></View>));

        return (
            <View style={styles.mainView}>
                <AnimatedTabs selectedIndex={this.state.selectedIndex} tabLabels={content}>
                    {tabs}
                </AnimatedTabs>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
