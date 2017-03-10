/**
 * Created by workplace on 31/01/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {View, StyleSheet} = ReactNative;

import {Icon} from 'react-native-elements'
import NavigationBar from 'react-native-navbar'

export default class CurrencyDetails extends React.Component {

    render() {
        const {navigator, currency} = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: "green"}}>
                <NavigationBar
                    title={{title: currency.symbol}}
                    leftButton={
                         <Icon
                            containerStyle={styles.toolbarButton}
                            name="keyboard-arrow-left"
                            onPress={ () => {
                                navigator.pop();
                            }}
                        />
                    }
                />
            </View>
        );
    }
}

CurrencyDetails.propTypes = {
    navigator: React.PropTypes.object,
    store: React.PropTypes.object,
    currency: React.PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbarButton: {
        padding: 10,
    }
});