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
export default class Feed extends React.Component {
    render() {
        const {navigator, store} = this.props;

        return (
            <View>
                <Text>Sentiment feed</Text>
            </View>
        )
    }
}


Feed.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        feed: React.PropTypes.any.isRequired
    })
};