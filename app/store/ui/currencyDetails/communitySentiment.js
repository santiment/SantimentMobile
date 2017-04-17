/**
 * Created by workplace on 14/04/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

import moment from 'moment'

export default class CommunitySentimentUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @computed get aggregate(): Object {
        const aggregatesForSymbol = _.get(this.domainStore.aggregates, `${this.domainStore.selectedSymbol}`);
        return _.isEmpty(aggregatesForSymbol) ? {bullish: 0, catish: 0, bearish: 0} : aggregatesForSymbol[0]
    }
}
