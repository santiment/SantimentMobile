/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import {observable, computed, autorun, action, useStrict} from 'mobx'

export default class AddCurrencyUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable query: string = "";
    @action setQuery = (query: string): void => {
        this.query = query;
    };

    @action addSymbol = (symbol: string): void => {
        this.domainStore.addSymbol(symbol);
    };

    @computed get rows(): string[] {
        const symbols: string[] = _.without(_.map(this.domainStore.tickers, (t) => _.get(t, 'symbol')), "");

        const rows: string[] = _.filter(symbols, s => _.includes(
            _.toLower(s),
            _.toLower(this.query)
        ));

        return rows
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }
}