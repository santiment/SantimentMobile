/**
 * Created by workplace on 21/02/2017.
 * @flow
 */


import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

const propTypes = {
    symbol: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50,
    },
    text: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
});

class AddCurrencyCell extends React.PureComponent {
    render() {
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
