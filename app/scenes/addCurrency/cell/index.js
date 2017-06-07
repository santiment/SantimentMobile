/**
 * Created by workplace on 21/02/2017.
 * @flow
 */


import React from 'react';

import {
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';

import getStyles from './styles';

const propTypes = {
    symbol: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
};

class AddCurrencyCell extends React.PureComponent {
    render() {
        const styles = getStyles();

        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {this.props.symbol}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

AddCurrencyCell.propTypes = propTypes;

export default AddCurrencyCell;
