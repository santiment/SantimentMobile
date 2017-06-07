/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import {
    responsiveHeight,
} from 'react-native-responsive-dimensions';

import Palette from '../../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Palette.justWhite,
        },
        currencyRowContainer: {
            height: responsiveHeight(9),
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Palette.mineShaft,
        },
        text: {
            fontSize: 14,
            fontWeight: '400',
        },
        priceColumn: {
            flex: 1,
            flexDirection: 'column',
            marginLeft: 10,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        },
        priceText: {
            fontSize: 18,
            textAlign: 'left',
            fontWeight: '500',
            color: Palette.mercuryOne,
        },
        changeText: {
            textAlign: 'left',
        },
        periodColumn: {
            width: 80,
            justifyContent: 'center',
            alignItems: 'stretch',
            marginRight: 10,
        },
        periodButton: {
            paddingTop: 5,
            paddingBottom: 5,
            height: 30,
            backgroundColor: Palette.charcoal,
        },
        periodText: {
            fontSize: 16,
            fontWeight: '500',
            color: Palette.veryLightGray,
            textAlign: 'center',
        },
        periodDropdown: {
            width: 80,
            backgroundColor: Palette.charcoal,
            borderColor: Palette.mineShaft,
            borderWidth: 2,
        },
        periodDropdownSeparator: {
            height: 2,
            backgroundColor: Palette.mineShaft,
        },
        listViewContainer: {
            backgroundColor: Palette.justWhite,
            flex: 1,
        },
        chart: {
            height: responsiveHeight(40),
        },
    })
);

export default getStyles;
