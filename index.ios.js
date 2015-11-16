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
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        var content = new Array(7).fill().map((x, i) => "Tab: " + (i+1));
        var tabs = content.map(x => (<View><Text>{x}</Text></View>));

        var buttons = new Array(7).fill().map((x, i) =>
            (<Button onPress={this.handleClick.bind(this, i)}>{i+1}</Button>)
        );

        // tabStyle = { headerTabs, footerTabs, headerLabel }
        // any element has own tabLabel and (or) tabIcon

        return (
            <View style={styles.mainView}>

                <View style={styles.buttons}>
                    {buttons}
                </View>

                <AnimatedTabs selectedIndex={this.state.selectedIndex}>
                    {tabs}
                </AnimatedTabs>
            </View>
        );
    }

    handleClick(i) {
        this.setState({ selectedIndex: i});
    }
}

var styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 20
    }
});

AppRegistry.registerComponent('ThingsDone', () => ThingsDone);
