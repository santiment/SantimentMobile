/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

const getStyles = (
    imageSize: number,
    percentageWidth: number,
): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
            margin: 20,
            backgroundColor: Palette.justWhite,
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
    })
);

export default getStyles;
