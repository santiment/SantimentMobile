/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
        },
        navBar: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: Palette.silver,
        },
        listView: {
            backgroundColor: Palette.whiteSmoke,
            flex: 1,
            marginTop: 0,
        },
        fabContainer: {
            position: 'absolute',
            bottom: 20,
            right: 20,
        },
        toolbarButton: {
            padding: 10,
        },
        header: {
            height: 20,
        },
        footer: {
            /**
             * Height includes offset (20 points)
             * and height of floating action button
             * (52 points).
             */
            height: 20 + 52,
        },
        separator: {
            height: 20,
        },
        noData: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        noDataText: {
            fontSize: 32,
            color: Palette.dustyGray,
            fontWeight: '500',
        },
        noDataButton: {
            width: 250,
            height: 40,
            margin: 20,
        },
    })
);

export default getStyles;
