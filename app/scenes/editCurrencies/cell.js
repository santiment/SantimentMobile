/**
 * @flow
 */

import React from 'react';

import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import {
    Icon,
} from 'react-native-elements';

import Palette from '../../resources/colors';

const propTypes = {
    symbol: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Palette.silver,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50,
    },
    deleteButton: {
        flex: 1,
        alignSelf: 'center',
        padding: 10,
    },
    text: {
        flex: 8,
        marginLeft: 10,
        marginRight: 10,
    },
});

class EditCurrencyCell extends React.PureComponent {
    render() {
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
