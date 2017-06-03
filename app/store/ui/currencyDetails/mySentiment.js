/**
 * @flow
 */

import {
    ListView,
    Alert,
} from 'react-native';

import _ from 'lodash';

import Rx from 'rxjs';

import {
    observable,
    computed,
    action,
    useStrict,
} from 'mobx';

import moment from 'moment';

import * as Poloniex from '../../../api/poloniex';

class MySentimentUiStore {

    /**
     * Domain store.
     */
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    /**
     * Shows whether data is loading now.
     */
    @observable isLoading: boolean = false;

    /**
     * Updates `isLoading` flag.
     */
    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

    @computed get ticker(): Object {
        const findTicker = arr => _.find(arr, t => _.isEqual(t.symbol, this.domainStore.selectedSymbol));
        const formatTicker = t => ({
            symbol: t.symbol,
            displaySymbol: _.replace(t.symbol, '_', '/'),
            dailyChangePercent: t.dailyChangePercent.toFixed(2),
            price: (() => {
                const p = t.price.toPrecision(6);
                if (_.includes(p, 'e') || p.length > 10) {
                    return t.price.toFixed(8);
                }
                return p;
            })(),
            volume: t.volume,
        });

        const getTicker = _.flow(findTicker, formatTicker);

        return getTicker(this.domainStore.tickers);
    }

    @computed get sentimentsForCurrentSymbol(): Object[] {
        return _.filter(
            this.domainStore.sentiments.slice(),
            s => _.isEqual(s.asset, this.domainStore.selectedSymbol),
        );
    }

    @computed get chartData(): Object[] {
        /**
         * Obtain candles.
         */
        const selectedPeriod = this.domainStore.periods[this.domainStore.indexOfSelectedPeriod];
        const formattedPeriod = Poloniex.periodToString(selectedPeriod);

        const timeseries = _.get(
            this.domainStore.history,
            [
                `${this.ticker.symbol}`,
                `${formattedPeriod}`,
            ],
            [],
        );

        const sentimentsForCurrentSymbolHashMap = {};

        this.domainStore.sentiments.forEach(
            (s) => {
                if (_.isEqual(s.asset, this.domainStore.selectedSymbol)) {
                    const correctedSentimentTimestampInSeconds = s.timestamp - (s.timestamp % selectedPeriod);
                    sentimentsForCurrentSymbolHashMap[correctedSentimentTimestampInSeconds] = s;
                }
            },
        );

        const candles = _.map(
            timeseries,
            (t) => {
                const correctedCandleTimestampInSeconds = t.timestamp - (t.timestamp % selectedPeriod);
                const sentimentObject = sentimentsForCurrentSymbolHashMap[correctedCandleTimestampInSeconds];

                return {
                    timestamp: correctedCandleTimestampInSeconds,
                    candle: _.pick(t, ['open', 'high', 'low', 'close']),
                    sentiment: _.get(sentimentObject, 'sentiment'),
                };
            },
        );

        /**
         * Return candles.
         */
        return candles;
    }

    @computed get rows(): Object[] {
        const sortByDate = arr => _.orderBy(arr, ['date'], ['desc']);
        const formatDates = arr => _.map(arr, s => ({ ...s, date: moment.unix(s.timestamp).fromNow() }));
        const formatPrice = arr => _.map(arr, s => ({
            ...s,
            price: _.isEmpty(s.price) ? '' : s.price,
        }));

        return _.flow(sortByDate, formatDates, formatPrice)(this.sentimentsForCurrentSymbol.slice());
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    @computed get dataSource(): Object {
        return this.ds.cloneWithRows(this.rows.slice());
    }

    @action refresh = (): void => {
        const selectedCandlestickPeriod = this.domainStore.periods[this.domainStore.indexOfSelectedPeriod];

        Rx.Observable
            .forkJoin(
                this.domainStore.refreshSentiments(
                    this.domainStore.user.id,
                ),
                this.domainStore.refreshHistory(
                    this.domainStore.symbols,
                    selectedCandlestickPeriod,
                ),
                this.domainStore.refreshTickers(),
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
                            },
                        },
                    ],
                ),
            );
    };

    @computed get dropdownOptions(): string[] {
        return this.domainStore.periods.map(Poloniex.periodToString);
    }

    @computed get dropdownDefaultValue(): string {
        /**
         * Obtain selected period by index.
         */
        const selectedPeriod = this.domainStore.periods[this.domainStore.indexOfSelectedPeriod];

        /**
         * Return string containing formatted period.
         */
        return Poloniex.periodToString(selectedPeriod);
    }

    @computed get dropdownDefaultIndex(): number {
        return this.domainStore.indexOfSelectedPeriod;
    }

    /**
     * Shows whether instruction is visible.
     */
    @observable isInstructionVisible: boolean = false;

    /**
     * Updates `isInstructionVisible` flag.
     *
     * @param {boolean} visible New value for `isInstructionVisible` flag.
     */
    @action setInstructionVisible = (visible: boolean): void => {
        this.isInstructionVisible = visible;
    };
}

export default MySentimentUiStore;
