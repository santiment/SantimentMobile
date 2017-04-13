/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'

import ReactNative from 'react-native';
const {AsyncStorage} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'
import {create, persist} from 'mobx-persist'

import * as Bitfinex from '../../api/bitfinex'
import * as Santiment from '../../api/santiment'

import type {SentimentType} from './types'

import DeviceInfo from 'react-native-device-info';

class DomainStore {
    constructor() {
        useStrict(true);
    }

    /**
     * User
     *
     */
    @persist('object')
    @observable
    user: Object = {
        id: DeviceInfo.getUniqueID()
    };

    /**
     * Symbols
     *
     */

    @persist('list')
    @observable symbols: string[] = [
        "BTC_USD",
        "ETH_USD"
    ];

    @action setSymbols = (symbols: string[]): void => {
        this.symbols = symbols;
    };

    @action addSymbol = (symbol: string): void => {
        this.symbols = _.union(this.symbols, [symbol]);
    };

    @action removeSymbol = (symbol: string): void => {
        this.symbols = _.without(this.symbols, symbol);
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
     * [{ symbol: "BTC_USD", price: 1050, dailyChangePercent: 6.34, volume: 500 }, ...]
     */

    @persist('list')
    @observable tickers: Object[] = [];

    @action setTickers = (tickers: Object[]): void => {
        this.tickers = tickers;
    };

    @action fetchTickers = (): Rx.Observable<Object[]> => {
        const bfxSymbols = this.symbols.map(s => `t${_.replace(s, "_", "")}`);

        // TODO: Handle empty or malformed data
        return Bitfinex.getTickers(bfxSymbols)
            .map(tickers => {
                return tickers.map(t => {
                    return {
                        symbol: this.symbols[bfxSymbols.indexOf(t[0])],
                        price: t[7],
                        dailyChangePercent: t[6] * 100,
                        volume: t[8],
                    }
                });
            })
    };

    /**
     * History
     *
     * {
     *     "BTC_USD": {
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

    @persist('object')
    @observable history: Object = {};

    @action setHistory = (history: Object): void => {
        this.history = history;
    };

    @action fetchHistory = (): Rx.Observable<Object> => {
        const period = "1D";

        const observables$ = this.symbols.map((symbol) => {
            const bfxSymbol = `t${_.replace(symbol, "_", "")}`;

            return Bitfinex.getCandles(bfxSymbol, period, 30)
                .map(items => {
                    const candles = items.map(item => {
                        return {
                            timestamp: item[0],
                            open: item[1],
                            close: item[2],
                            high: item[3],
                            low: item[4],
                            volume: item[5],
                        }
                    });

                    let obj = {};
                    _.set(obj, [symbol, period], _.orderBy(candles, ['timestamp'], ['asc']));

                    return obj;
                })
        });

        // $FlowFixMe
        return Rx.Observable.forkJoin(observables$)
            .map(arr => _.assign(...arr))
    };

    /**
     * Sentiment
     *
     * [{
     *     user: "id",
     *     data: [
     *         {"id": "aaa", "symbol": "BTC_USD", "sentiment": "bullish", "price", 1041, "date": "2017-03-16T23:23:41.229Z"},
     *     ]
     * }]
     *
     */

    @persist('list')
    @observable sentiments: SentimentType[] = [];

    @action setSentiment = (sentiments: SentimentType[]): void => {
        this.sentiments = sentiments;
        console.log("Sentiments:\n", JSON.stringify(sentiments, null, 2));
    };

    @action addSentiment = (sentiment: SentimentType): Rx.Observable<Object> => {
        const userSentiment = _.assign(sentiment, {userId: this.user.id});
        return Santiment.postSentiment(userSentiment);
    };

    @action fetchSentiment = (): Rx.Observable<SentimentType[]> => {
        return Santiment.getSentiment(this.user.id);
    };
    // ---------
}

const hydrate = create({storage: AsyncStorage});

const domainStore = new DomainStore();
export default domainStore;

hydrate('store', domainStore).then(() => console.log('DomainStore hydrated'));