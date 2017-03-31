/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

import moment from 'moment'

export default class CurrencyDetailsUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable periods: string[] = ['1H', '4H', '1D', '1W'];

    @observable selectedPeriod: number = 2;

    @action setSelectedPeriod = (index: number): void => {
        this.selectedPeriod = index;
    };

    @observable isLoading: boolean = false;

    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

    @action refresh = (): void => {
    };

    @computed get ticker(): Object {
        const findTicker = (arr) => _.find(arr, t => _.isEqual(t.symbol, this.domainStore.selectedSymbol));
        const formatTicker = (t) => { return {
            symbol: t.symbol,
            dailyChangePercent: t.dailyChangePercent.toPrecision(3),
            price: t.price.toPrecision(4),
            volume: t.volume,
        }};

        const getTicker = _.flow(findTicker, formatTicker);

        return getTicker(this.domainStore.tickers);
    }

    @computed get candles(): Object[] {
        const path = [`${this.ticker.symbol}`, `${this.periods[this.selectedPeriod]}`];
        const ohlcv = _.get(this.domainStore.history, path, []);
        const candles = ohlcv.map(i => {
           return {
               x: parseFloat(i.timestamp),
               open: i.open,
               high: i.high,
               low: i.low,
               close: i.close,
           }
        });

        return candles;
    }

    @computed get sentiments(): Object[] {
        const getData = (obj) => _.get(obj, "[0].data", []);
        const filterBySymbol = (arr) => _.filter(arr, s => { return _.isEqual(s.symbol, this.domainStore.selectedSymbol) });

        return _.flow(getData, filterBySymbol)(this.domainStore.sentiment.slice())
    }

    @computed get sentimentSeries(): Object[] {
        const sortByDate = (arr) => _.orderBy(arr, ['date'], ['desc']);
        const toSeries = (arr) => _.map(arr, s => { return {
            x: moment(s.date).valueOf(),
            sentiment: s.sentiment,
        }});

        return _.flow(sortByDate, toSeries)(this.sentiments.slice())
    }

    @computed get rows(): Object[] {
        const sortByDate = (arr) => _.orderBy(arr, ['date'], ['desc']);
        const formatDates = (arr) => _.map(arr, s => { return {...s, date: moment(s.date).fromNow()}});
        const formatPrice = (arr) => _.map(arr, s => { return {...s, price: `${s.price}`}});

        return _.flow(sortByDate, formatDates, formatPrice)(this.sentiments.slice())
    }

    _dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }
}