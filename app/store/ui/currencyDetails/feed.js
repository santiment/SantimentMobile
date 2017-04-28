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

export default class FeedUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @computed get feed(): Object[] {
        const data = [
            {timestamp: 1490069901245, id: 14273947, user: {name: "KylesCoins", reputation: 2}, message: "blockchainsql, numbers right?"},
            {timestamp: 1490068804784, id: 14273948, user: {name: "ashsha990", reputation: 3}, message: "KylesCoins, What do you think..will be the peak before the big drop?"},
            {timestamp: 1490068805585, id: 14273949, user: {name: "thermodynamics4", reputation: 131}, message: "want to get crazy and buy some BTC, when is this HF?"},
            {timestamp: 1490068809259, id: 14273950, user: {name: "derpcoin", reputation: 13}, message: "BTC perkin up in chinerrrrr"},
            {timestamp: 1490068809973, id: 14273951, user: {name: "Lagniappe", reputation: 92}, message: "dmcguiness, banking money systems arent valued by what someone says their savings accounts are, but by their loans and liquiditty"},
            {timestamp: 1490068814003, id: 14273952, user: {name: "davmkr8", reputation: 27}, message: "hi"},
            {timestamp: 1490068816687, id: 14273953, user: {name: "shorts", reputation: 3707}, message: "colossus, blockchain proof or GTFO:)"},
            {timestamp: 1490068817562, id: 14273954, user: {name: "GodLikeProductions", reputation: 159}, message: "btc at 1084 at other exchanges"},
            {timestamp: 1490068819190, id: 14273955, user: {name: "KylesCoins", reputation: 2}, message: "ernestoco91, no"},
            {timestamp: 1490068819482, id: 14273956, user: {name: "wbe4ever", reputation: 858}, message: "thermodynamics4, 2min 15 sec"},
            {timestamp: 1490068819951, id: 14273957, user: {name: "Xoblort", reputation: 5249}, message: "Hello Trollbox ! Good day!"},
            {timestamp: 1490068823659, id: 14273958, user: {name: "unluckyman", reputation: 53}, message: "ernestoco91, probably not 0.43, maybe 0.043. lol"},
            {timestamp: 1490068825629, id: 14273959, user: {name: "CoinMeGood", reputation: 288}, message: "GodLikeProductions, well no polotics on polo but ill end it with i am glad you see the light sir. many are very naive and dont care about what really matters"},
            {timestamp: 1490068827525, id: 14273960, user: {name: "Anondran", reputation: 1765}, message: "looks like Chinese whales are back in BTC"},
            {timestamp: 1490068827882, id: 14273961, user: {name: "mr2f", reputation: 104}, message: "Xoblort, o/"},
        ];

        return _.map(_.orderBy(data, ['timestamp'], ['desc']), m => {
           return {
               _id: m.id,
               text: m.message,
               createdAt: new Date(m.timestamp),
               user: {
                   _id: m.user.name,
                   name: m.user.name,
               }
           }
        });
    }
}


