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
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
        },
        viewContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
        },
        column: {
            width: 80,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageContainer: {
            padding: 5,
            height: 60,
            width: 60,
        },
        image: {
            height: 50,
            width: 50,
        },
        text: {
            fontSize: 36,
            fontWeight: '500',
        },
    })
);

export default getStyles;
