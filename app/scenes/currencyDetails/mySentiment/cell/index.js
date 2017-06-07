/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    Image,
} from 'react-native';

import getStyles from './styles';

const propTypes = {
    date: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    sentiment: React.PropTypes.string.isRequired,
};

class MySentimentCell extends React.PureComponent {
    render() {
        const styles = getStyles();

        const imagePath = (sentiment) => {
            switch (sentiment) {
            case 'bullish': return require('../../../../resources/images/bull.png');
            case 'catish': return require('../../../../resources/images/cat.png');
            case 'bearish': return require('../../../../resources/images/bear.png');
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
