/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import {observable, computed, autorun, action, useStrict} from 'mobx'

export default class CurrenciesUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable isLoading: boolean = false;

    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

    @action refresh = (): void => {
        this.domainStore.fetchTickers()
    };

    @action selectSymbol = (symbol: string): void => {
        this.domainStore.setSelectedSymbol(symbol)
    };

    @computed get rows(): Object[] {
        const selectedTickers = _.filter(this.domainStore.tickers, t => _.includes(this.domainStore.symbols, t.symbol));

        return selectedTickers.map(t => {
            return {
                symbol: t.symbol,
                dailyChangePercent: t.dailyChangePercent.toFixed(2),
                price: t.price.toPrecision(4),
                volume: t.volume,
            }
        });
    }

    _dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }

}