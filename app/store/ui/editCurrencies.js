/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

export default class EditCurrenciesUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @action removeSymbol = (symbol: string): void => {
        this.domainStore.removeSymbol(symbol);
    };

    @computed get rows(): string[] {
        return this.domainStore.symbols.slice();
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }
}

