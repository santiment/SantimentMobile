/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

import ColorGenerator from '../../utils/colorGenerator';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        modal: {
            flex: 1,
        },
        navbar: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: Palette.silver,
        },
        navbarButton: {
            padding: 10,
        },
        contentWrapper: {
            backgroundColor: ColorGenerator.colorWithOpacity(
                Palette.justBlack,
                0xdd,
            ),
            width: '100%',
            height: '100%',
        },
        text: {
            color: Palette.justWhite,
            padding: 20,
        },
    })
);

export default getStyles;
