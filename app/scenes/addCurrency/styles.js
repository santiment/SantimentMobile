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
        listView: {
            backgroundColor: Palette.justWhite,
            flex: 1,
            marginTop: 0,
        },
        toolbarButton: {
            padding: 10,
        },
    })
);

export default getStyles;
