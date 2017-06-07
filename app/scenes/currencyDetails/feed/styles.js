/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Palette.justWhite,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        text: {
            fontSize: 14,
            fontWeight: '400',
        },
        currencyRowContainer: {
            flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Palette.mineShaft,
        },
        priceColumn: {
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        },
        priceText: {
            fontSize: 16,
            textAlign: 'left',
            fontWeight: '500',
            color: Palette.mercuryOne,
        },
        changeText: {
            marginLeft: 10,
            textAlign: 'left',
            fontSize: 16,
        },
        periodColumn: {
            width: 80,
            justifyContent: 'center',
            alignItems: 'stretch',
            marginRight: 10,
        },
        periodText: {
            fontSize: 16,
            fontWeight: '500',
            color: Palette.veryLightGray,
            textAlign: 'center',
        },
    })
);

export default getStyles;
