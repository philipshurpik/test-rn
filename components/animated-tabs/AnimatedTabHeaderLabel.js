'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Component, Text, StyleSheet } = React;

class AnimatedTabHeaderLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activatedIndex: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activatedIndex >= 0) {
            this.setState({activatedIndex: null});
        }
    }

    render() {
        var isActive = this.props.currentIndex === this.props.index || this.state.activatedIndex === this.props.index;
        var color = isActive ? 'lightBlue' : 'orange';

        return (
            <TouchableOpacity style={styles.tabHeaderLabel} key={this.props.index} onPress={this._onPress.bind(this)}>
                <View>
                    <Text style={{color}}>{this.props.tabLabel}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress() {
        this.setState({activatedIndex: this.props.index});
        this.props.onPress(this.props.index);
    }
}

AnimatedTabHeaderLabel.propTypes = {
    tabLabel: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onPress: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    tabHeaderLabel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});

module.exports = AnimatedTabHeaderLabel;