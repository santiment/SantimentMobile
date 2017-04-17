/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView, Alert} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

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
        this.domainStore.refresh()
            .subscribe(
                () => {},
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        {text: 'OK', onPress: () => {}},
                    ]
                ),
            );
    };

    @computed get rows(): Object[] {
        const symbols: Object[] = _.map(
            this.domainStore.tickers,
            t => {
                const symbol = _.get(t, 'symbol');
                return {
                    symbol: symbol,
                    displaySymbol: _.replace(symbol, "_", "/")
                }
            }
        );

        const rows: Object[] = _.filter(symbols, s => _.includes(
            _.toLower(s.displaySymbol),
            _.toLower(this.query)
        ));

        return rows
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }
}