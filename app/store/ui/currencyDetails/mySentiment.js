/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash';

import ReactNative from 'react-native';
const {
    ListView,
    Alert
} = ReactNative;

import Rx from 'rxjs';

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx';

import moment from 'moment';

import * as Poloniex from '../../../api/poloniex';

export default class MySentimentUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable periods: string[] = ['1H', '4H', '1D'];

    @observable selectedPeriod: number = 2;

    @action setSelectedPeriod = (index: number): void => {
        console.log(typeof index);
        this.selectedPeriod = index;
    };

    @observable isLoading: boolean = false;

    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

    @computed get ticker(): Object {
        const findTicker = (arr) => _.find(arr, t => _.isEqual(t.symbol, this.domainStore.selectedSymbol));
        const formatTicker = (t) => { return {
            symbol: t.symbol,
            displaySymbol: _.replace(t.symbol, "_", "/"),
            dailyChangePercent: t.dailyChangePercent.toFixed(2),
            price: (() => {
                const p = t.price.toPrecision(6);
                if (_.includes(p, "e") || p.length > 10) {
                    return t.price.toFixed(8);
                }
                return p;
            })(),
            volume: t.volume,
        }};

        const getTicker = _.flow(findTicker, formatTicker);

        return getTicker(this.domainStore.tickers);
    }

    @computed get sentimentsForCurrentSymbol(): Object[] {
        return _.filter(
            this.domainStore.sentiments.slice(),
            s => { return _.isEqual(s.asset, this.domainStore.selectedSymbol) }
        );
    }

    @computed get chartData(): Object[] {
        const timeseries = _.get(
            this.domainStore.history,
            [`${this.ticker.symbol}`, `${this.periods[this.selectedPeriod]}`],
            []
        );

        const sentimentsForCurrentSymbol = _.filter(
            this.domainStore.sentiments.slice(),
            s => { return _.isEqual(s.asset, this.domainStore.selectedSymbol) }
        );

        const candles = _.map(
            timeseries,
            t => {
                // const date = moment.unix(t.date);
                const candleTimestamp = new Date(t.timestamp * 1000).setHours(0, 0, 0, 0);


                const sentimentObject = _.find(sentimentsForCurrentSymbol, s => {
                    const sentimentTimestamp = new Date(s.timestamp * 1000).setHours(0, 0, 0, 0);

                    return candleTimestamp === sentimentTimestamp;
                });
                return {
                    timestamp: candleTimestamp,
                    candle: _.pick(t, ['open', 'high', 'low', 'close']),
                    sentiment: _.get(sentimentObject, 'sentiment'),
                }
            }
        );

        return candles;
    }
    @computed get rows(): Object[] {
        const sortByDate = (arr) => _.orderBy(arr, ['date'], ['desc']);
        const formatDates = (arr) => _.map(arr, s => { return {...s, date: moment.unix(s.timestamp).fromNow()}});
        const formatPrice = (arr) => _.map(arr, s => { return {
            ...s,
            price: _.isEmpty(s.price) ? "" : s.price
        }});

        return _.flow(sortByDate, formatDates, formatPrice)(this.sentimentsForCurrentSymbol.slice());
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }

    @action refresh = (): void => {
        Rx.Observable
            .forkJoin(
                this.domainStore.refreshSentiments(
                    this.domainStore.user.id
                ),
                this.domainStore.refreshHistory(
                    this.domainStore.symbols,
                    Poloniex.candlestickPeriods.oneDay
                ),
            )
            .subscribe(
                () => { },
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                            }
                        }
                    ]
                )
            );
    };
}
