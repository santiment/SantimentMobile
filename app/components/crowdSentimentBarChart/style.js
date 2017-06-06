/**
 * @flow
 */

import {
    ScaledSize,
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

class StyleManager {

    imageSize: number;

    percentageWidth: number;

    screenDimensions: ScaledSize;

    constructor(
        imageSize: number,
        percentageWidth: number,
        screenDimensions: ScaledSize,
    ) {
        this.imageSize = imageSize;
        this.percentageWidth = percentageWidth;
        this.screenDimensions = screenDimensions;
    }

    container: StyleSheet.Style = StyleSheet.create({
        style: {
            flex: 1,
            margin: 20,
            backgroundColor: Palette.justWhite,
            flexDirection: 'column',
            justifyContent: 'center',
        },
    }).style;

    row: StyleSheet.Style = StyleSheet.create({
        style: {
            height: this.imageSize,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }).style;

    imageContainer: StyleSheet.Style = StyleSheet.create({
        style: {
            padding: 5,
            height: this.imageSize,
            width: this.imageSize,
        },
    }).style;

    image: StyleSheet.Style = StyleSheet.create({
        style: {
            height: this.imageSize - 10,
            width: this.imageSize - 10,
        },
    }).style;

    text: StyleSheet.Style = StyleSheet.create({
        style: {
            fontSize: 36,
            fontWeight: '500',
        },
    }).style;

    percentage: StyleSheet.Style = StyleSheet.create({
        style: {
            marginLeft: 10,
            textAlign: 'center',
            width: this.percentageWidth,
        },
    }).style;

    barContainer: StyleSheet.Style = StyleSheet.create({
        style: {
            flex: 1,
        },
    }).style;
}

export default StyleManager;
