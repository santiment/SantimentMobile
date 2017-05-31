/**
 * Created by workplace on 09/05/2017.
 * @flow
 */


import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

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

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                margin: 20,
                backgroundColor: '#ffffff',
                flexDirection: 'column',
                justifyContent: 'center',
            },
            row: {
                height: imageSize,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            imageContainer: {
                padding: 5,
                height: imageSize,
                width: imageSize,
            },
            image: {
                height: imageSize - 10,
                width: imageSize - 10,
            },
            text: {
                fontSize: 36,
                fontWeight: '500',
            },
            percentage: {
                marginLeft: 10,
                textAlign: 'center',
                width: percentageWidth,
            },
            barContainer: {
                flex: 1,
            },
        });

        const screen = Dimensions.get('window');

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
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.bullishPercentage, backgroundColor: '#00e36f' }} />
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
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.catishPercentage, backgroundColor: '#cccccc' }} />
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
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.bearishPercentage, backgroundColor: '#e73c4c' }} />
                    </View>
                    <Text style={styles.percentage}>{aggregate.bearishPercentageDisplay}</Text>
                </View>
            </View>
        );
    }
}

CrowdSentimentBarChart.propTypes = propTypes;

export default CrowdSentimentBarChart;

