/**
 * Created by workplace on 09/02/2017.
 * @flow
 */


import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';

import {
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Palette from '../../resources/colors';

const propTypes = {
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
        shadowColor: Palette.justGray,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
    },
    currencyRowContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Palette.white,
    },
    sentimentQuestionContainer: {
        backgroundColor: Palette.alabaster,
        padding: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Palette.mercuryTwo,
    },
    buttonRowContainer: {
        backgroundColor: Palette.alabaster,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 18,
        color: Palette.mortar,
        fontWeight: '500',
        textAlign: 'center',
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
        borderColor: Palette.mercuryTwo,
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderColor: Palette.mercuryTwo,
    },
    imageContainer: {
        padding: 5,
        height: 50,
        width: 50,
    },
    image: {
        height: 40,
        width: 40,
    },
    buttonText: {
        fontSize: 14,
        color: Palette.justGray,
        fontWeight: '500',
    },
    symbolColumn: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: 'blue',
    },
    symbolText: {
        fontSize: responsiveFontSize(3),
        color: Palette.dustyGray,
        fontWeight: '500',
    },
    priceColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    priceText: {
        fontSize: responsiveFontSize(2),
        color: Palette.dustyGray,
        fontWeight: '500',
        textAlign: 'right',
    },
    changeText: {
        fontSize: responsiveFontSize(2),
        color: Palette.dustyGray,
        fontWeight: '500',
        textAlign: 'right',
    },
    chartColumn: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: responsiveFontSize(2),
        color: Palette.dustyGray,
        fontWeight: '500',
    },
    sentimentBadge: {
        margin: 4,
        height: 12,
        width: 12,
        borderRadius: 50,
        backgroundColor: Palette.forestGreenTwo,
    },
});

class CurrencyCell extends React.PureComponent {
    render() {
        let changeColor;

        if (this.props.dailyChangePercent > 0) {
            changeColor = Palette.forestGreenOne;
        } else if (this.props.dailyChangePercent < 0) {
            changeColor = Palette.fireBrick;
        } else {
            changeColor = Palette.spunPearl;
        }

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

                            <Text style={[styles.changeText, { color: changeColor }]}>
                                {`${this.props.dailyChangePercent}%`}
                            </Text>

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
                            onPress={() => this.props.onVote('bullish')}
                            underlayColor={Palette.whiteSmoke}
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
                            onPress={() => this.props.onVote('catish')}
                            underlayColor={Palette.whiteSmoke}
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
                            onPress={() => this.props.onVote('bearish')}
                            underlayColor={Palette.whiteSmoke}
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
        );
    }
}

CurrencyCell.propTypes = propTypes;

export default CurrencyCell;
