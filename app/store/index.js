/**
 * Created by workplace on 08/02/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
// import Rx from 'rxjs'

import ReactNative from 'react-native';
const {AsyncStorage, ListView} = ReactNative;

import {observable, computed, autorun, action, useStrict} from 'mobx'
import { create, persist   } from 'mobx-persist'

import * as CoinMarketCap from '../api/coinmarketcap';


class Store {
    constructor() {
        useStrict(true);

        autorun(() => console.log(
            "Portfolio\n" + JSON.stringify(this.portfolio, null, 2) + "\n",
            "Ticker\n" + this.tickers.length, //JSON.stringify(, null, 2) + "\n",
        ));
    }

    // Global state
    @persist('list') @observable portfolio: string[]= [
        "BTC",
        "ETH"
    ];

    @persist('list') @observable tickers: Object[] = [{symbol: "BTC", price_usd: "1000", price_btc: "1"}];

    @action updateTickers = (tickers: Object[]): void => {
        console.log(tickers);
        this.tickers = tickers;
    };

    @action addToPortfolio = (item: string): void => {
        this.portfolio =  _.union(this.portfolio, [item]);
    };

    @action removeFromPortfolio = (item: string): void => {
        this.portfolio =  _.without(this.portfolio, item);
    };

    // Currencies scene
    @observable isLoading: boolean = false;

    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

    @action fetchTickers = (): void => {
        this.setIsLoading(true);
        CoinMarketCap.getTicker()
            .do(() => this.setIsLoading(false))
            .subscribe(this.updateTickers, console.log)
    };

    _currenciesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get currenciesDS(): Object {
        const rows = _.filter(this.tickers, t => _.includes(this.portfolio, t.symbol));
        return this._currenciesDS.cloneWithRows(rows);
    }


    // Add Currency scene
    @observable query: string = "";

    _addCurrencyDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get addCurrencyDS(): Object {
        const symbols: string[] = _.without(_.map(this.tickers, (t) => _.get(t, 'symbol')), "");

        const rows: string[] = _.filter(symbols, s => _.includes(
            _.toLower(s),
            _.toLower(this.query)
        ));
        return this._addCurrencyDS.cloneWithRows(rows);
    }

    @action updateQuery = (query: string): void => {
        this.query = query;
    };

    // Edit Currencies scene
    _editCurrenciesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get editCurrenciesDS(): Object {
        const rows = this.portfolio.slice();
        return this._editCurrenciesDS.cloneWithRows(rows);
    }
}

const store = new Store();

const persistStore = create({
    storage: AsyncStorage // default localStorage
});

export default persistStore('store', new Store);