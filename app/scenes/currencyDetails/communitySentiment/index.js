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

        return (
            <View>
                <Text>Community sentiment aggregate</Text>
            </View>
        )
    }
}
