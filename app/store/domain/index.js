/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'

import ReactNative from 'react-native';
const {AsyncStorage} = ReactNative;

import {observable, computed, autorun, action, useStrict} from 'mobx'
import {create, persist} from 'mobx-persist'

import * as Bitfinex from '../../api/bitfinex'

class DomainStore {
    constructor() {
        useStrict(true);
    }

    /**
     * Symbols
     *
     */

    @persist('list') @observable symbols: string[] = [
        "BTC/USD",
        "ETH/USD"
    ];

    @action setSymbols = (symbols: string[]): void => {
        this.symbols = symbols;
    };

    /**
     * Selected symbol
     *
     * string
     */
    @observable selectedSymbol: string = "";

    @action setSelectedSymbol = (symbol: string): void => {
        this.selectedSymbol = symbol;
    };

    /**
     * Tickers
     *
     * [{ symbol: "BTC/USD", price: 1050, dailyChangePercent: 6.34, volume: 500 }, ...]
     */

    @persist('list') @observable tickers: Object[] = [];

    @action setTickers = (tickers: Object[]): void => {
        this.tickers = tickers;
    };

    @action fetchTickers = (): void => {
        const bfxSymbols = this.symbols.map(s => `t${_.replace(s, "/", "")}`);

        console.log("Symbols\n", this.symbols);
        console.log("BfxSymbols\n", bfxSymbols);

        // TODO: Handle empty or malformed data
        Bitfinex.getTickers(bfxSymbols)
            .map(tickers => {
                return tickers.map(t => {
                    console.log("T\n", t);
                    return {
                        symbol: this.symbols[bfxSymbols.indexOf(t[0])],
                        price: t[7],
                        dailyChangePercent: t[6]*100,
                        volume: t[8],
                    }
                });
            })
            .subscribe(this.setTickers, console.log);
    };

    /**
     * History
     *
     * {
     *     "BTC/USD": {
     *         "1H": [
     *             { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 }
     *         ],
     *         "4H": [
     *             { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 }
     *         ],
     *     }
     * }
     *
     */

    @persist('object') @observable history: Object = {};

    @action setHistory = (history: Object): void => {
        this.history = history;
    };

    @action fetchCandles = (symbol: string, period: string): void => {
        const bfxSymbol = `t${_.replace(symbol, "/", "")}`;

        Bitfinex.getCandles(bfxSymbol, period, 10)
            .map(items => {
                return items.map(item => {
                    return {
                        timestamp: item[0],
                        open: item[1],
                        close: item[2],
                        high: item[3],
                        low: item[4],
                        volume: item[5],
                    }
                });
            })
            .subscribe(candles => _.set(this.history, `${symbol}.${period}`, candles), console.log);
            // TODO: don't mutate this.history directly
    };

    /**
     * Sentiments
     *
     * [{
     *     user: "id",
     *     data: [
     *         { symbol: "BTC/USD", sentiment: "bullish", price: 1050 }
     *     ]
     * }]
     *
     */

    @persist('list') @observable sentiments: Object[] = [];

    @action setSentiments = (sentiments: Object[]): void => {
        this.sentiments = sentiments;
    };

    @action fetchSentiments = (): void => {
        let sentiments = [{
            "userId": "TESTUSER",
            "sentiment": [
                {
                    "id": "aaa",
                    "asset": "BTC",
                    "sentiment": "bullish",
                    "date": "2017-03-16T23:23:41.229Z"
                },
                {
                    "id": "bbb", "asset": "BTC",
                    "sentiment": "bullish",
                    "date": "2017-03-17T23:23:41.229Z"
                },
                {
                    "id": "aAA",
                    "asset": "ETH",
                    "sentiment": "bearish",
                    "date": "2017-03-14T23:23:41.229Z"
                },
                {
                    "id": "EEE",
                    "asset": "ETH",
                    "sentiment": "bearish",
                    "date": "2017-03-15T23:23:41.229Z"
                },
                {
                    "id": "GGG",
                    "asset": "ETH",
                    "sentiment": "bearish",
                    "date": "2017-03-16T23:23:41.229Z"
                },
                {
                    "id": "ZZZ",
                    "asset": "ETH",
                    "sentiment": "bearish",
                    "date": "2017-03-17T23:23:41.229Z"
                }
            ]
        }];

        Rx.Observable.timer(1000).first().subscribe(() => {this.setSentiments(sentiments)}, console.log)
    };

    // ---------


    @action addSymbol = (symbol: string): void => {
        this.symbols = _.union(this.symbols, [symbol]);
    };

    @action removeSymbol = (symbol: string): void => {
        this.symbols = _.without(this.symbols, symbol);
    };


}

const persistStore = create({
    storage: AsyncStorage
});

export default persistStore('store', new DomainStore());