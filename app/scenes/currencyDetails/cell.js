/**
 * Created by workplace on 21/03/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text} = ReactNative;

export default class CurrencyDetailsCell extends React.Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.date]}>
                    {this.props.date}
                </Text>

                <Text style={[styles.text, styles.price]}>
                    {this.props.priceUSD}
                </Text>

                <Text style={[styles.text, styles.sentiment]}>
                    {this.props.sentiment}
                </Text>
            </View>
        )
    }
}

CurrencyDetailsCell.propTypes = {
    date: React.PropTypes.string.isRequired,
    priceUSD: React.PropTypes.string.isRequired,
    sentiment: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    date: {
        flex: 8,
    },
    price: {
        flex: 3,
        textAlign: "center"
    },
    sentiment: {
        flex: 3,
        textAlign: "center"
    },
    text: {
        fontSize: 16,
        color: "#999999",
        fontWeight: "500",
        justifyContent: 'center',
    }
});
