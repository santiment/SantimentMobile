/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
} from 'react-native';

import {
    Icon,
} from 'react-native-elements';

import getStyles from './styles';

const propTypes = {
    symbol: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

class EditCurrencyCell extends React.PureComponent {
    render() {
        const styles = getStyles();

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.symbol}
                </Text>

                <Icon
                    name="delete-forever"
                    containerStyle={styles.deleteButton}
                    onPress={this.props.onDelete}
                />
            </View>
        );
    }
}

EditCurrencyCell.propTypes = propTypes;

export default EditCurrencyCell;
