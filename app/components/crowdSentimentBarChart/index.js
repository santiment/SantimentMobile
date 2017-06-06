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

import StyleManager from './style';

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
        
        const styleManager = new StyleManager(
            imageSize,
            percentageWidth,
            screenDimensions,
        );

        return (
            <View style={styleManager.container}>
                <View style={styleManager.row}>
                    <View style={styleManager.imageContainer}>
                        <Image
                            style={styleManager.image}
                            source={require('../../resources/images/bull.png')}
                        />
                    </View>
                    <View style={styleManager.barContainer}>
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.bullishPercentage, backgroundColor: Palette.springGreen }} />
                    </View>
                    <Text style={styleManager.percentage}>{aggregate.bullishPercentageDisplay}</Text>
                </View>

                <View style={styleManager.row}>
                    <View style={styleManager.imageContainer}>
                        <Image
                            style={styleManager.image}
                            source={require('../../resources/images/cat.png')}
                        />
                    </View>
                    <View style={styleManager.barContainer}>
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.catishPercentage, backgroundColor: Palette.silver }} />
                    </View>
                    <Text style={styleManager.percentage}>{aggregate.catishPercentageDisplay}</Text>
                </View>

                <View style={styleManager.row}>
                    <View style={styleManager.imageContainer}>
                        <Image
                            style={styleManager.image}
                            source={require('../../resources/images/bear.png')}
                        />
                    </View>
                    <View style={styleManager.barContainer}>
                        <Text style={{ width: (screen.width - imageSize - percentageWidth) * aggregate.bearishPercentage, backgroundColor: Palette.amaranthOne }} />
                    </View>
                    <Text style={styleManager.percentage}>{aggregate.bearishPercentageDisplay}</Text>
                </View>
            </View>
        );
    }
}

CrowdSentimentBarChart.propTypes = propTypes;

export default CrowdSentimentBarChart;
