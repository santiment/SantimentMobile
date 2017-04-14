/**
 * Created by workplace on 21/03/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text, Image} = ReactNative;

export default class MySentimentCell extends React.Component {
    render () {

        const imagePath = (sentiment) => {
            switch (sentiment) {
                case "bullish": return require('../../../resources/images/bull.png');
                case "catish": return require('../../../resources/images/cat.png');
                case "bearish": return require('../../../resources/images/bear.png');
                default: return ''
            }
        };

        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.date]}>
                    {this.props.date}
                </Text>

                <Text style={[styles.text, styles.price]}>
                    {this.props.price}
                </Text>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={imagePath(this.props.sentiment)}
                    />
                </View>
            </View>
        )
    }
}

MySentimentCell.propTypes = {
    date: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
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
    },
    imageContainer: {
        padding: 5,
        height: 40,
        width: 40
    },
    image: {
        height: 30,
        width: 30,
    },
});
