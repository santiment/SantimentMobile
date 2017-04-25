/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'
import moment from 'moment'

import ReactNative from 'react-native';
const {AsyncStorage, Alert} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'
import {create, persist} from 'mobx-persist'

import * as Bitfinex from '../../api/bitfinex'
import * as Poloniex from '../../api/poloniex'

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
        "BTC_USDT",
        "ETH_USDT"
    ];

    @action setSymbols = (symbols: string[]): void => {
        this.symbols = symbols;
        console.log("Symbols updated:\n", symbols);
    };

    @action addSymbol = (symbol: string): void => {
        this.setSymbols(_.union(this.symbols, [symbol]));
    };

    @action removeSymbol = (symbol: string): void => {
        this.setSymbols(_.without(this.symbols, symbol));
    };

    /**
     * Selected symbol
     *
     * string
     */

    @observable selectedSymbol: string = "";

    @action setSelectedSymbol = (symbol: string): void => {
        this.selectedSymbol = symbol;
        console.log("Symbol selected:\n", symbol);
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
        console.log("Tickers updated:\n", tickers);
    };

    @action fetchTickers = (): Rx.Observable<Object[]> => {
        // TODO: Handle empty or malformed data

        const reversePair = (s) => _.join(_.reverse(_.split(s, "_")), "_");

        return Poloniex.getTickers()
            .map(t => {
                return _.map(_.keys(t), k => {
                    return {
                        symbol: reversePair(k),
                        price: parseFloat(_.get(t, [k, "last"], "0")),
                        dailyChangePercent: parseFloat(_.get(t, [k, "percentChange"], "0")) * 100,
                        volume: parseFloat(_.get(t, [k, "baseVolume"], "0")),
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
        console.log("History updated:\n", history);
    };

    @action fetchHistory = (): Rx.Observable<Object> => {
        const period = "1D";

        const observables$ = this.symbols.map((symbol) => {
            const reversePair = (s) => _.join(_.reverse(_.split(s, "_")), "_");

            return Poloniex.getCandles(reversePair(symbol), moment().subtract(180, 'days').toDate(), moment().toDate(), 86400)
                .map(items => {
                    const candles = items.map(i => {
                        return {
                            timestamp: i.date,
                            ..._.pick(i, ['open', 'close', 'high', 'low'])
                        }
                    });

                    let obj = {};
                    _.set(obj, [symbol, period], _.orderBy(candles, ['timestamp'], ['asc']));

                    return obj;
                });
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
     *         {"id": "aaa", "symbol": "BTC_USD", "sentiment": "bullish", "price", 1041, "timestamp": "1318874398"},
     *     ]
     * }]
     *
     */

    @persist('list')
    @observable sentiments: SentimentType[] = [];

    @action setSentiment = (sentiments: SentimentType[]): void => {
        this.sentiments = sentiments;
        console.log("Sentiments updated:\n", sentiments);
    };

    @action addSentiment = (sentiment: SentimentType): Rx.Observable<Object> => {
        const userSentiment = _.assign(sentiment, {userId: this.user.id});
        const newSentiments = _.concat([], userSentiment, this.sentiments.slice());

        this.setSentiment(newSentiments);

        return Santiment.postSentiment(userSentiment)
            .do(() => console.log("POST /sentiment succeeded"));
    };

    @action fetchSentiment = (): Rx.Observable<SentimentType[]> => {
        return Santiment.getSentiment(this.user.id);
    };

    /**
     * Aggregate sentiment
     *   {
     *       "BTC_USD": [
     *           {"bullish": 1, "bearish": 2, "catish": 0 , "date": "2017-03-16T23:23:41.229Z"},
     *           {"bullish": 1, "bearish": 2, "catish": 0 , "date": "2017-03-16T23:23:41.229Z"}
     *       ],
     *       "ETH_USD": [
     *           {"bullish": 1, "bearish": 2, "catish": 0 , "date": "2017-03-16T23:23:41.229Z"},
     *           {"bullish": 1, "bearish": 2, "catish": 0 , "date": "2017-03-16T23:23:41.229Z"}
     *       ],
     *   }
     */

    @persist('object')
    @observable aggregates: Object = {};

    @action setAggregates = (aggregates: Object): void => {
        this.aggregates = aggregates;
        console.log("Aggregates updated:\n", aggregates);
    };

    @action fetchAggregates = (): Rx.Observable<Object> => {
        const observables$ = this.symbols.map((symbol) => {

            return Santiment.getAggregate(symbol)
                .map(items => {
                    let obj = {};
                    _.set(obj, [symbol], items);

                    return obj;
                })
        });

        // $FlowFixMe
        return Rx.Observable.forkJoin(observables$)
            .map(arr => _.assign(...arr))
    };

    /**
     * Refresh
     */

    @action refresh = (): Rx.Observable<any> => {
        console.log("domainStore.refresh() called");
        console.log("user =", JSON.stringify(domainStore.user, null, 2));
        console.log("symbols =", JSON.stringify(domainStore.symbols.slice(), null, 2));

        return Rx.Observable
            .forkJoin(
                this.fetchTickers(),
                this.fetchHistory(),
                this.fetchSentiment(),
                this.fetchAggregates(),
            )
            .do(
                ([tickers, history, sentiment, aggregates]) => {
                    this.setTickers(tickers);
                    this.setHistory(history);
                    this.setSentiment(sentiment);
                    this.setAggregates(aggregates);
                },
                console.log
            )
            .do(() => console.log('domainStore refreshed'), console.log)
    }
}

const hydrate = create({storage: AsyncStorage});

const domainStore = new DomainStore();
export default domainStore;

Rx.Observable.fromPromise(hydrate('store', domainStore))
    .do(() => console.log('domainStore hydrated'))
    .flatMap(() => domainStore.refresh())
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