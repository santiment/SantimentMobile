/**
 * Created by workplace on 09/02/2017.
 * @flow
 */

'use strict';


import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, Image} = ReactNative;

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class CurrencyCell extends React.Component {
    render() {

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
            width: responsiveWidth(15),
            height: 20
        };

        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={styles.container}>

                    <View style={styles.currencyRowContainer}>
                        <View style={styles.symbolColumn}>

                            <Text style={styles.symbolText}>
                                {this.props.symbol}
                            </Text>

                        </View>

                        <View style={styles.priceColumn}>

                            <Text style={styles.priceText}>
                                {this.props.price}
                            </Text>

                            <Text style={[
                                styles.text,
                                this.props.dailyChangePercent > 0
                                    ? {color: "#28aa38"}
                                    : this.props.dailyChangePercent < 0
                                    ? {color: "#bd2c27"}
                                    : {color: "#b1b1b2"}
                            ]}>
                                {this.props.dailyChangePercent + "%"}
                            </Text>

                        </View>

                        <View style={styles.chartColumn}>

                        </View>

                        <View style={styles.trendColumn}>
                            <View style={styles.sentimentBadge}/>
                        </View>
                    </View>

                    <View style={styles.sentimentQuestionContainer}>
                        <Text style={styles.questionText}>
                            How do you feel about {this.props.symbol} today?
                        </Text>
                    </View>

                    <View style={styles.buttonRowContainer}>

                        <TouchableHighlight
                            style={[styles.button, styles.borderRight]}
                            onPress={() => this.props.onVote(this.props.symbol, this.props.price, "bullish")}
                            underlayColor={"#f0f0f0"}
                        >
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={require('./../../resources/images/bull.png')}
                                    />
                                </View>

                                <Text style={styles.buttonText}>
                                    Bullish
                                </Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.props.onVote(this.props.symbol, this.props.price, "catish")}
                            underlayColor={"#f0f0f0"}
                        >
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={require('./../../resources/images/cat.png')}
                                    />
                                </View>

                                <Text style={styles.buttonText}>
                                    Catish
                                </Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.button, styles.borderLeft]}
                            onPress={() => this.props.onVote(this.props.symbol, this.props.price, "bearish")}
                            underlayColor={"#f0f0f0"}
                        >
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={require('./../../resources/images/bear.png')}
                                    />
                                </View>

                                <Text style={styles.buttonText}>
                                    Bearish
                                </Text>
                            </View>
                        </TouchableHighlight>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

CurrencyCell.propTypes = {
    symbol: React.PropTypes.string.isRequired,
    dailyChangePercent: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    onVote: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        shadowColor: "gray",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {width: 0, height: 1}
    },
    currencyRowContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    sentimentQuestionContainer: {
        backgroundColor: "#f8f8f8",
        padding: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#e7e7e7",
    },
    buttonRowContainer: {
        backgroundColor: "#f8f8f8",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        color: "#565656",
        fontWeight: "500",
        textAlign: "center",
    },
    button: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: "#e7e7e7",
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderColor: "#e7e7e7",
    },
    imageContainer: {
        padding: 5,
        height: 50,
        width: 50
    },
    image: {
        height: 40,
        width: 40,
    },
    buttonText: {
        fontSize: 14,
        color: "#808080",
        fontWeight: "500",
    },
    symbolColumn: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: "stretch",
        // backgroundColor: 'blue',
    },
    symbolText: {
        fontSize: responsiveFontSize(3),
        color: "#999999",
        fontWeight: "500",
    },
    priceColumn: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "stretch",
    },
    priceText: {
        fontSize: responsiveFontSize(2),
        color: "#999999",
        fontWeight: "500",
    },
    chartColumn: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trendColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: "#999999",
        fontWeight: "500",
    },
    sentimentBadge: {
        margin: 4,
        height: 12,
        width: 12,
        borderRadius: 50,
        backgroundColor: "#28aa38"
    },
});