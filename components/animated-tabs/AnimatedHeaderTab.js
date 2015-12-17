'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Component, Text } = React;

class AnimatedHeaderTab extends Component {
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
            <TouchableOpacity style={this.props.style} key={this.props.index} onPress={this._onPress.bind(this)}>
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

AnimatedHeaderTab.propTypes = {
    //style: React.PropTypes.object.isRequired,
    tabLabel: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    //currentIndex: React.PropTypes.bool.number,
    onPress: React.PropTypes.func
};

module.exports = AnimatedHeaderTab;