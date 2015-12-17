'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

var styles = React.StyleSheet.create({
    panels: {
        flex: 1,
        top: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
    },
    panel: {
        width: deviceWidth,
        height: deviceHeight - 88
    },
    contentPanel: {
        padding: 15,
        borderColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#000',
        shadowOffset: {height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 10
    },
    headerTab: {
        flex: 1,
        flexDirection: 'row',
        top: 0,
        left: deviceWidth,
        height: 44,
        width: deviceWidth,
        backgroundColor: 'white'
    },
    headerTabLabel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});

module.exports = styles;