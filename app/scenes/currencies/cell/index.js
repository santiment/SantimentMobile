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
} from 'react-native';

import Palette from '../../../resources/colors';

import ImageCollection from '../../../resources/images';

import getStyles from './styles';

const propTypes = {
    symbol: React.PropTypes.string.isRequired,
    dailyChangePercent: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    onPress: React.PropTypes.func.isRequired,
    onVote: React.PropTypes.func.isRequired,
};

class CurrencyCell extends React.PureComponent {
    render() {
        const styles = getStyles();

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
                                        source={ImageCollection.bull}
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
                                        source={ImageCollection.cat}
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
                                        source={ImageCollection.bear}
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
