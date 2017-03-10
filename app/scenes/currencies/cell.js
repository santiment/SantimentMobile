/**
 * Created by workplace on 09/02/2017.
 * @flow
 */

'use strict';


import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text, TouchableWithoutFeedback} = ReactNative;

import ChartPreview from '../../components/chartPreview'

export default class CurrencyCell extends React.Component {
    render () {

        let data =
                [{
                    "x": 0,
                    "y": 2
                }, {
                    "x": 1,
                    "y": 2.5
                }, {
                    "x": 2,
                    "y": 4
                }, {
                    "x": 3,
                    "y": 4
                }, {
                    "x": 4,
                    "y": 3.5
                }]
            ;

        let options = {
            width: 50,
            height: 20
        };

        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.container}>

                    <View style={styles.coinColumn}>

                        <Text style={styles.text}>
                            {this.props.symbol}
                        </Text>

                    </View>

                    <View style={styles.priceColumn}>

                        <Text style={styles.text}>
                            {this.props.priceUSD}
                        </Text>

                        <Text style={styles.text}>
                            {this.props.priceBTC}
                        </Text>

                    </View>

                    <View style={styles.chartColumn}>

                        <ChartPreview data={data} options={options}/>

                    </View>

                    <View style={styles.trendColumn}>

                        <View style={styles.sentimentBadge}/>

                        <Text style={styles.text}>
                            Bull
                        </Text>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

CurrencyCell.propTypes = {
    symbol: React.PropTypes.string.isRequired,
    priceBTC: React.PropTypes.string.isRequired,
    priceUSD: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 85,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        fontSize: 16,
        color: "#999999",
        fontWeight: "500"
    },
    bold: {
        fontWeight: "500"
    },
    sentimentBadge: {
        margin: 4,
        height: 13,
        width: 13,
        borderRadius: 50,
        backgroundColor: "#98d7b5"
    },
    coinColumn: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // backgroundColor: 'blue',
    },
    priceColumn: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // backgroundColor: 'steelblue',
    },
    chartColumn: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'cyan',
    },
    trendColumn: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'pink',
    }
});