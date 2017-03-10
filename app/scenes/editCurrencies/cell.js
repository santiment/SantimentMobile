/**
 * Created by workplace on 09/02/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text} = ReactNative;
import {Icon} from 'react-native-elements'

export default class EditCurrencyCell extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.symbol}
                </Text>

                <Icon
                    name="delete-forever"
                    containerStyle={styles.deleteButton}
                    onPress={() => this.props.onDelete(this.props.symbol)}
                />
            </View>
        )
    }
}

EditCurrencyCell.propTypes = {
    symbol: React.PropTypes.string.isRequired,
    onDelete: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50
    },
    deleteButton: {
        flex: 1,
        alignSelf: 'center',
        padding: 10
    },
    text: {
        flex: 8,
        marginLeft: 10,
        marginRight: 10
    }
});