/**
 * @flow
 */

import {
    StyleSheet,
} from 'react-native';

const getStyles = (): StyleSheet => (
    StyleSheet.create({
        container: {
            flex: 1,
        },
        listView: {
            backgroundColor: 'white',
            flex: 1,
            marginTop: 0,
        },
        toolbarButton: {
            padding: 10,
        },
    })
);

export default getStyles;
