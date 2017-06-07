/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

import Palette from '../../../../resources/colors';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        container: {
            height: 50,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Palette.justWhite,
            borderBottomColor: Palette.silver,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        date: {
            flex: 6,
            textAlign: 'right',
        },
        price: {
            flex: 4,
            marginLeft: 10,
            textAlign: 'left',
        },
        sentiment: {
            flex: 3,
        },
        text: {
            fontSize: 16,
            color: Palette.silverChalice,
            fontWeight: '500',
        },
        imageContainer: {
            padding: 5,
            height: 40,
            width: 40,
        },
        image: {
            height: 30,
            width: 30,
        },
    })
);

export default getStyles;
