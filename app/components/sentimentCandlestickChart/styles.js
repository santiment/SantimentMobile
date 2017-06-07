/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        chart: {
            flex: 1,
        },
        noData: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Palette.mineShaft,
        },
        noDataText: {
            fontSize: 32,
            color: Palette.veryLightGray,
            fontWeight: '500',
        },
    })
);

export default getStyles;
