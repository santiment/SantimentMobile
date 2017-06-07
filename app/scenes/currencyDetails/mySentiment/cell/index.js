/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native';

import ImageCollection from '../../../../resources/images';

import getStyles from './styles';

const propTypes = {
    date: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    sentiment: React.PropTypes.string.isRequired,
};

class MySentimentCell extends React.PureComponent {
    render() {
        const styles = getStyles();

        const getImage = (sentiment) => {
            switch (sentiment) {
            case 'bullish':
                return ImageCollection.bull;
            case 'catish':
                return ImageCollection.cat;
            case 'bearish':
                return ImageCollection.bear;
            default:
                return '';
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={getImage(this.props.sentiment)}
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
