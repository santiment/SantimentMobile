/**
 * Created by workplace on 14/04/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {Text, View} = ReactNative;

import {observer} from 'mobx-react/native'

@observer
export default class CommunitySentiment extends React.Component {
    render() {
        const {navigator, store} = this.props;

        console.log("Aggregate:\n", JSON.stringify(store.aggregate, null, 2));


        return (
            <View>
                <Text>{`Bullish: ${store.aggregate.bullish}`}</Text>
                <Text>{`Catish: ${store.aggregate.catish}`}</Text>
                <Text>{`Bearish: ${store.aggregate.bearish}`}</Text>
            </View>
        )
    }
}

CommunitySentiment.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        aggregate: React.PropTypes.any.isRequired
    })
};