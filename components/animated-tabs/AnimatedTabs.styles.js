'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        top: 44,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
    },
    card: {
        width: deviceWidth,
        height: deviceHeight / 2.5,
        padding: 15,
        borderColor: 'rgba(0,0,0,0.1)',
        shadowColor: '#000',
        shadowOffset: {height: 5},
        shadowOpacity: 0.7,
        shadowRadius: 10
    }
});

module.exports = styles;