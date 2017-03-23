/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import {observable, computed, autorun, action, useStrict} from 'mobx'

export default class CurrencyDetailsUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @computed get ticker(): Object {
        return _.find(this.domainStore.tickers, t => _.isEqual(t.symbol, this.domainStore.selectedSymbol));
    };

    @computed get rows(): Object[] {
        return [
            {
                date: "21.03.2017",
                priceUSD: "1054",
                sentiment: "bullish",
            },
            {
                date: "22.03.2017",
                priceUSD: "1074",
                sentiment: "catish",
            }
        ];
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows);
    }
}