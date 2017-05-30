/**
 * @flow
 */

import _ from 'lodash';

import Rx from 'rxjs';

import moment from 'moment';

import {
    AsyncStorage,
    Alert,
} from 'react-native';

import {
    observable,
    computed,
    action,
    useStrict,
} from 'mobx';

import {
    create,
    persist,
} from 'mobx-persist';

import DeviceInfo from 'react-native-device-info';

import CandlestickPeriod from '../../utils/candlestickPeriod';

import * as Poloniex from '../../api/poloniex';

import * as Santiment from '../../api/santiment';

import type {
    SentimentType,
} from './types';


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
        id: DeviceInfo.getUniqueID(),
    };

    /**
     * Symbols
     *
     */

    @persist('list')
    @observable symbols: string[] = [
        'BTC_USDT',
        'ETH_USDT',
    ];

    @action setSymbols = (symbols: string[]): void => {
        this.symbols = symbols;
        console.log('Symbols updated:\n', symbols);
    };

    @action addSymbol = (symbol: string): void => {
        this.setSymbols(_.union(this.symbols, [symbol]));
    };

    @action removeSymbol = (symbol: string): void => {
        this.setSymbols(_.without(this.symbols, symbol));
    };

    @action getAssets = (): string[] => this.symbols.map((pairOfCurrencies) => {
            /**
             * Extract asset from pair of currencies
             * and return it.
             */
        const asset = _.split(pairOfCurrencies, '_')[0];
        return asset;
    });

    /**
     * Selected symbol
     *
     * string
     */

    @observable selectedSymbol: string = '';

    @action setSelectedSymbol = (symbol: string): void => {
        this.selectedSymbol = symbol;
        console.log('Symbol selected:\n', symbol);
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
        console.log('Tickers updated:\n', tickers);
    };

    /**
     * Updates tickers in local storage.
     *
     * @return Observable.
     */
    @action refreshTickers = (): Rx.Observable<any> => {
        /**
         * Console output.
         */
        console.log('Did begin to refresh tickers');

        /**
         * Update local storage and return observable.
         */
        return Poloniex.getTickers()
            .do(
                (tickers) => {
                    this.setTickers(tickers);
                },
                console.log,
            )
            .do(() => console.log('Did finish to refresh tickers'), console.log);
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
    numberOfCandlesticksToDownload = 360;

    @persist('object')
    @observable history: Object = {};

    @action setHistory = (history: Object): void => {
        /**
         * Merge existing history with new one.
         */
        this.history = _.assign(
            {},
            this.history,
            history,
        );

        /**
         * Console output.
         */
        console.log(
            'History updated:\n',
            history,
        );
    };

    /**
     * Updates history in local storage.
     *
     * @param {string[]} symbols Array of currency pairs.
     * @param {CandlestickPeriod} candlestickPeriod Candlestick period.
     * @return Observable.
     */
    @action refreshHistory = (symbols: string[], candlestickPeriod: CandlestickPeriod): Rx.Observable<any> => {
        /**
         * Console output.
         */
        console.log('Did begin to refresh history');

        /**
         * Obtain time interval.
         */
        const endDate = moment().toDate();

        const startDate = candlestickPeriod.findStartDate(
            endDate,
            this.numberOfCandlesticksToDownload,
        );

        /**
         * Update local storage and return observable.
         */
        return Poloniex.getCandles(
            this.symbols,
            startDate,
            endDate,
            candlestickPeriod,
        ).do(
            (history) => {
                this.setHistory(history);
            },
            console.log,
        ).do(
            () => console.log('Did finish to refresh history'),
            console.log,
        );
    };

    /**
     * Sentiment
     *
     * [{
     *     user: "id",
     *     data: [
     *         {"id": "aaa", "symbol": "BTC_USD", "sentiment": "bullish", "price": 1041, "timestamp": "1318874398"},
     *     ]
     * }]
     */

    @persist('list')
    @observable sentiments: SentimentType[] = [];

    @action setSentiment = (sentiments: SentimentType[]): void => {
        this.sentiments = sentiments;
        console.log('Sentiments updated:\n', sentiments);
    };

    @action addSentiment = (sentiment: SentimentType): Rx.Observable<Object> => {
        const userSentiment = _.assign(sentiment, { userId: this.user.id });
        const newSentiments = _.concat([], userSentiment, this.sentiments.slice());

        this.setSentiment(newSentiments);

        return Santiment.postSentiment(userSentiment)
            .do(() => console.log('POST /sentiment succeeded'));
    };

    /**
     * Updates sentiments in local storage.
     *
     * @param {string} userId User ID.
     * @return Observable.
     */
    @action refreshSentiments = (userId: String): Rx.Observable<any> => {
        /**
         * Console output.
         */
        console.log('Did begin to refresh sentiments');

        /**
         * Update local storage and return observable.
         */
        return Santiment.getSentiments(userId)
            .do(
                (sentiments) => {
                    this.setSentiment(sentiments);
                },
                console.log,
            )
            .do(() => console.log('Did finish to refresh sentiments'), console.log);
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
        console.log('Aggregates updated:\n', aggregates);
    };

    /**
     * Updates feeds in local storage.
     *
     * @param {string[]} symbols Array of currency pairs.
     * @return Observable.
     */
    @action refreshAggregates = (symbols: String[]): Rx.Observable<Object> => {
        /**
         * Console output.
         */
        console.log('Did begin to refresh aggregates');

        /**
         * Update local storage and return observable.
         */
        return Santiment.getAggregates(symbols)
            .do(
                (aggregates) => {
                    this.setAggregates(aggregates);
                },
                console.log,
            )
            .do(() => console.log('Did finish to refresh aggregates'), console.log);
    };

    /**
     * Feeds
     *   {
     *       "BTC": [
     *           {
     *             "timestamp": 1494520384,
     *             "username": "UName",
     *             "message": "Can do you help me... Ticket #123 BTC Awaiting Approval",
     *             "source": "trollbox"
     *           },
     *       ],
     *   }
     */

    @persist('object')
    @observable feeds: Object = {};

    @action setFeeds = (feeds: Object): void => {
        this.feeds = feeds;
        console.log('Feeds updated:\n', feeds);
    };

    /**
     * Updates feeds in local storage.
     *
     * @param {string[]} assets Array of currencies, e.g. ["BTC", "ETH"].
     * @return Observable.
     */
    @action refreshFeeds = (assets: string[]): Rx.Observable<Object> => {
        /**
         * Console output.
         */
        console.log('Did begin to refresh feeds');

        /**
         * Update local storage and return observable.
         */
        return Santiment.getFeeds(assets)
            .do(
                (feeds) => {
                    this.setFeeds(feeds);
                },
                console.log,
            )
            .do(() => console.log('Did finish to refresh feeds'), console.log);
    };

    /**
     * Updates tickers, history, sentiments, aggregates and feeds
     * in local storage.
     *
     * @return Observable.
     */
    @action refresh = (): Rx.Observable<any> => {
        /**
         * Console output.
         */
        console.log('domainStore.refresh() called');
        console.log('user =', JSON.stringify(this.user, null, 2));
        console.log('symbols =', JSON.stringify(this.symbols.slice(), null, 2));

        /**
         * Obtain time interval for candles.
         */
        const dateForLastCandle = moment().toDate();

        const dateForFirstCandle = this.selectedCandlestickPeriod.findStartDate(
            dateForLastCandle,
            this.numberOfCandlesticksToDownload,
        );

        /**
         * Update local storage and return observable.
         */
        return Rx.Observable
            .forkJoin(
                Poloniex.getTickers(),
                Poloniex.getCandles(
                    this.symbols,
                    dateForFirstCandle,
                    dateForLastCandle,
                    this.selectedCandlestickPeriod,
                ),
                Santiment.getSentiments(
                    this.user.id,
                ),
                Santiment.getAggregates(
                    this.symbols,
                ),
                Santiment.getFeeds(
                    this.getAssets(),
                ),
            )
            .do(
                ([tickers, history, sentiment, aggregates, feeds]) => {
                    this.setTickers(tickers);
                    this.setHistory(history);
                    this.setSentiment(sentiment);
                    this.setAggregates(aggregates);
                    this.setFeeds(feeds);
                },
                console.log,
            )
            .do(() => console.log('domainStore refreshed'), console.log);
    }

    /**
     * Periods for displaying on the list.
     */
    @observable periods: CandlestickPeriod[] = [
        Poloniex.candlestickPeriods.twoHours,
        Poloniex.candlestickPeriods.fourHours,
        Poloniex.candlestickPeriods.oneDay,
    ];

    /**
     * Index of selected candlestick period.
     */
    @observable indexOfSelectedPeriod: number = 2;

    /**
     * Updates index of selected candlestick period.
     */
    @action setIndexOfSelectedPeriod = (index: number): void => {
        this.indexOfSelectedPeriod = index;
    };

    /**
     * Selected candlestick period.
     */
    @computed get selectedCandlestickPeriod(): CandlestickPeriod {
        return this.periods[this.indexOfSelectedPeriod];
    }
}

const hydrate = create({ storage: AsyncStorage });

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
                { text: 'OK', onPress: () => {} },
            ],
        ),
    );
