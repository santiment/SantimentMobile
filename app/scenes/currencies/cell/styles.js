/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import {
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Palette from '../../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
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
            backgroundColor: Palette.justWhite,
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
    })
);

export default getStyles;
