/**
 * Created by workplace on 09/05/2017.
 * @flow
 */

import React from 'react';

import {
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

import getStyles from './styles';

import Palette from '../../resources/colors';

const propTypes = {
    aggregate: React.PropTypes.shape({
        bullishPercentage: React.PropTypes.number.isRequired,
        catishPercentage: React.PropTypes.number.isRequired,
        bearishPercentage: React.PropTypes.number.isRequired,
        bullishPercentageDisplay: React.PropTypes.string.isRequired,
        catishPercentageDisplay: React.PropTypes.string.isRequired,
        bearishPercentageDisplay: React.PropTypes.string.isRequired,
    }).isRequired,
};

class CrowdSentimentBarChart extends React.PureComponent {
    render() {
        const { aggregate } = this.props;
        
        const imageSize = 50;
        const percentageWidth = 30;
        const screenDimensions = Dimensions.get('window');

        const styles = getStyles(
            imageSize,
            percentageWidth,
        );

        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../resources/images/bull.png')}
                        />
                    </View>
                    <View style={styles.barContainer}>
                        <Text style={{ width: (screenDimensions.width - imageSize - percentageWidth) * aggregate.bullishPercentage, backgroundColor: Palette.springGreen }} />
                    </View>
                    <Text style={styles.percentage}>{aggregate.bullishPercentageDisplay}</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../resources/images/cat.png')}
                        />
                    </View>
                    <View style={styles.barContainer}>
                        <Text style={{ width: (screenDimensions.width - imageSize - percentageWidth) * aggregate.catishPercentage, backgroundColor: Palette.silver }} />
                    </View>
                    <Text style={styles.percentage}>{aggregate.catishPercentageDisplay}</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={require('../../resources/images/bear.png')}
                        />
                    </View>
                    <View style={styles.barContainer}>
                        <Text style={{ width: (screenDimensions.width - imageSize - percentageWidth) * aggregate.bearishPercentage, backgroundColor: Palette.amaranthOne }} />
                    </View>
                    <Text style={styles.percentage}>{aggregate.bearishPercentageDisplay}</Text>
                </View>
            </View>
        );
    }
}

CrowdSentimentBarChart.propTypes = propTypes;

export default CrowdSentimentBarChart;
