/**
 * @flow
 */

import React from 'react';

import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';

import Palette from '../../../resources/colors';

const propTypes = {
    date: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    sentiment: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Palette.justWhite,
        borderBottomColor: Palette.silver,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    date: {
        flex: 6,
        textAlign: 'right',
    },
    price: {
        flex: 4,
        marginLeft: 10,
        textAlign: 'left',
    },
    sentiment: {
        flex: 3,
    },
    text: {
        fontSize: 16,
        color: Palette.silverChalice,
        fontWeight: '500',
    },
    imageContainer: {
        padding: 5,
        height: 40,
        width: 40,
    },
    image: {
        height: 30,
        width: 30,
    },
});

class MySentimentCell extends React.PureComponent {
    render() {
        const imagePath = (sentiment) => {
            switch (sentiment) {
            case 'bullish': return require('../../../resources/images/bull.png');
            case 'catish': return require('../../../resources/images/cat.png');
            case 'bearish': return require('../../../resources/images/bear.png');
            default: return '';
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={imagePath(this.props.sentiment)}
                    />
                </View>

                <Text style={[styles.text, styles.price]}>
                    {this.props.price}
                </Text>

                <Text style={[styles.text, styles.date]}>
                    {this.props.date}
                </Text>
            </View>
        );
    }
}

MySentimentCell.propTypes = propTypes;

export default MySentimentCell;
