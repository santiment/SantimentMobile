/**
 * Created by workplace on 23/02/2017.
 * @flow
 */

'use strict';


import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text} = ReactNative;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        fontSize: 16,
        color: "#969696",
        fontWeight: "bold",
        textAlignVertical: "center"
    },
    coinColumn: {
        flex: 2,
    },
    priceColumn: {
        flex: 4,
    },
    chartColumn: {
        flex: 2,
    },
    trendColumn: {
        flex: 2,
        alignItems: 'center',
    }
});

const Header = (props) => (
    <View style={styles.container}>

        <View style={styles.coinColumn}>

            <Text style={styles.text}>
                Coin
            </Text>

        </View>

        <View style={styles.priceColumn}>

            <Text style={styles.text}>
                Price
            </Text>

        </View>

        <View style={styles.chartColumn}>

        </View>

        <View style={styles.trendColumn}>

            <Text style={styles.text}>
                Trend
            </Text>

        </View>

    </View>
);

export default Header