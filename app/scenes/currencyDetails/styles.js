/**
 * @flow
 */

import {
    ScaledSize,
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

const getStyles = (
    screenDimensions: ScaledSize,
    numberOfTabs: number,
): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Palette.justWhite,
        },
        navBar: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: Palette.silver,
        },
        navButton: {
            padding: 10,
        },
        tabBar: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        tabButton: {
            padding: 10,
            flex: 1,
        },
        activeTabText: {
            textAlign: 'center',
            color: Palette.justBlack,
        },
        inactiveTabText: {
            textAlign: 'center',
            color: Palette.suvaGray,
        },
        underline: {
            backgroundColor: Palette.justBlack,
            width: 30,
            height: 0,
            marginLeft: ((screenDimensions.width / numberOfTabs) - 30) / 2,
        },
    })
);

export default getStyles;
