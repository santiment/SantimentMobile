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
import * as Santiment from '../../api/santiment'

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

        // TODO: Handle empty or malformed data
        Bitfinex.getTickers(bfxSymbols)
            .map(tickers => {
                return tickers.map(t => {
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

    @action fetchHistory = (): void => {
        let history = {
            "BTC/USD": {
                "1H": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1029.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "4H": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1030.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "1D": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1020.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1023.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "1W": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1030.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1022.4, volume: 500 },
                ],
            },
            "ETH/USD": {
                "1H": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1029.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "4H": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1030.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "1D": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1020.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1023.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                ],
                "1W": [
                    { timestamp: "1490263200000", open: 1029.4, high: 1034.4, low: 1025.1, close: 1030.4, volume: 500 },
                    { timestamp: "1490263200001", open: 1029.4, high: 1034.4, low: 1025.1, close: 1028.4, volume: 500 },
                    { timestamp: "1490263200002", open: 1029.4, high: 1034.4, low: 1025.1, close: 1027.4, volume: 500 },
                    { timestamp: "1490263200003", open: 1029.4, high: 1034.4, low: 1025.1, close: 1022.4, volume: 500 },
                ],
            }
        };

        this.setHistory(history)
    };

    @action fetchCandles = (symbol: string, period: string): void => {
        // const bfxSymbol = `t${_.replace(symbol, "/", "")}`;

        //
        // Bitfinex.getCandles(bfxSymbol, period, 10)
        //     .map(items => {
        //         return items.map(item => {
        //             return {
        //                 timestamp: item[0],
        //                 open: item[1],
        //                 close: item[2],
        //                 high: item[3],
        //                 low: item[4],
        //                 volume: item[5],
        //             }
        //         });
        //     })
        //     .subscribe(
        //         candles => {
        //             let history = _.cloneDeep(this.history);
        //             _.set(history, `${symbol}.${period}`, candles);
        //             this.setHistory(history)
        //         },
        //         console.log
        //     );
            // TODO: don't mutate this.history directly
    };

    /**
     * Sentiments
     *
     * [{
     *     user: "id",
     *     data: [
     *         {"id": "aaa", "symbol": "BTC/USD", "sentiment": "bullish", "price", 1041, "date": "2017-03-16T23:23:41.229Z"},
     *     ]
     * }]
     *
     */

    @persist('list') @observable sentiment: Object[] = [];

    @action setSentiment = (sentiments: Object[]): void => {
        this.sentiment = sentiments;
    };

    @action fetchSentiments = (): void => {
        Santiment.getSentiment().subscribe(this.setSentiment, console.log);
    };

    // ---------


    @action addSymbol = (symbol: string): void => {
        this.symbols = _.union(this.symbols, [symbol]);
    };

    @action removeSymbol = (symbol: string): void => {
        this.symbols = _.without(this.symbols, symbol);
    };


}

const hydrate = create({ storage: AsyncStorage });

const domainStore = new DomainStore();
export default domainStore;

hydrate('store', domainStore).then(() => console.log('DomainStore hydrated'));