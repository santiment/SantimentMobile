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
        const votes = _.isEmpty(aggregatesForSymbol) ? {bullish: 0, catish: 0, bearish: 0} : aggregatesForSymbol[0]

        const totalVotes = votes.bullish + votes.catish + votes.bearish;

        return {
            ...votes,
            totalVotes: totalVotes,
            bullishPercentage: votes.bullish / totalVotes,
            catishPercentage: votes.catish / totalVotes,
            bearishPercentage: votes.bearish / totalVotes,
            bullishPercentageDisplay: (votes.bullish / totalVotes * 100).toPrecision(2) + '%',
            catishPercentageDisplay: (votes.catish / totalVotes * 100).toPrecision(2) + '%',
            bearishPercentageDisplay: (votes.bearish / totalVotes * 100).toPrecision(2) + '%',

        }
    }
}
