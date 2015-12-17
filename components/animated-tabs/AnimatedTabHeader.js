'use strict';

var React = require('react-native');
var { Component, View } = React;
var styles = require('./AnimatedTabs.styles.js');
var AnimatedTabHeaderLabel = require('./AnimatedTabHeaderLabel.js');

class AnimatedTabPanel extends Component {
    render() {
        var tabs = this.props.children.map((tabLabel, i) => {
            return (
                <AnimatedTabHeaderLabel
                    style={styles.headerTabLabel}
                    tabLabel={tabLabel}
                    index={i}
                    key={i}
                    currentIndex={this.props.currentIndex}
                    onPress={this.props.onLabelPress}>
                </AnimatedTabHeaderLabel>
            );
        });

        return tabs ? (<View style={styles.headerTab}>{tabs}</View>) : null;
    }
}


module.exports = AnimatedTabPanel;