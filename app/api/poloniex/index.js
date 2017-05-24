/**
 * Created by workplace on 17/04/2017.
 * @flow
 */

'use strict';

import Rx from 'rxjs';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import * as PoloniexHttpClient from './httpClient.js';

/**
 * Candlestick periods.
 * 
 * Each period is represented in seconds.
 * 
 * You can check list of available periods here:
 * https://poloniex.com/support/api (`returnChartData` section)
 */
export const candlestickPeriods = {
    fiveMinutes: 300,
    fifteenMinutes: 900,
    thirtyMinutes: 1800,
    oneHour: 3600, // not supported by Poloniex API
    twoHours: 7200,
    fourHours: 14400,
    oneDay: 86400
};

/**
 * Returns string representation of Poloniex candlestick period.
 * 
 * @param {period} period Period in seconds, e.g. 14400.
 * @return String representation of Poloniex candlestick period.
 *      In case when period is not included in the list of available periods,
 *      method returns empty string.
 */
export const periodToString = (period: number): string => {
    switch (period) {
        case candlestickPeriods.fiveMinutes:
            return '5m';
        case candlestickPeriods.fifteenMinutes:
            return '15m';
        case candlestickPeriods.thirtyMinutes:
            return '30m';
        case candlestickPeriods.oneHour:
            return '1H';
        case candlestickPeriods.twoHours:
            return '2H';
        case candlestickPeriods.fourHours:
            return '4H';
        case candlestickPeriods.oneDay:
            return '1D';
        default:
            return '';
    }
};

/**
 * Downloads tickers.
 * 
 * @return Observable.
 */
export const getTickers = (): any => {
    /**
     * Start request.
     */
    const request = PoloniexHttpClient.getTickers();

    /**
     * Handle response.
     */
    const response = request
        .then(response => response.data);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response)
        .map(t => {
            return _.map(_.keys(t), k => {
                return {
                    symbol: utils.reversePair(k),
                    price: parseFloat(_.get(t, [k, "last"], "0")),
                    dailyChangePercent: parseFloat(_.get(t, [k, "percentChange"], "0")) * 100,
                    volume: parseFloat(_.get(t, [k, "baseVolume"], "0")),
                }
            });
        });
    
    // TODO: Handle empty or malformed data.
};

/**
 * Downloads candles.
 * 
 * Response with Section = "hist":
 * [
 *     [ MTS, OPEN, CLOSE, HIGH, LOW, VOLUME],
 *     ...
 * ]
 * 
 * @param {string[]} symbols Array of currency pairs, e.g. ["BTC_STEEM", "BTC_USDT"].
 * @param {Date} from Start date.
 *      If not specified, 180 days ago date will be used by default.
 * @param {Date} to End date.
 *      If not specified, current date will be used by default.
 * @param {number} candlestickPeriod Candlestick period in seconds, e.g. 14400.
 *      Poloniex API allows limited set of periods.
 *      For correct usage, you can take period from
 *      one of constants: `candlestickPeriods.thirtyMinutes`,
 *      `candlestickPeriods.fourHours`, etc.
 *      If not specified, 1 day period will be used by default.
 * @return Observable.
 */
export const getCandles = (symbols: string[], startDate: Date, endDate: Date, candlestickPeriod: number): any => {
    /**
     * Default values.
     */
    const defaultStartDate = moment().subtract(180, 'days').toDate();
    const defaultEndDate = moment().toDate();
    const defaultCandlestickPeriod = candlestickPeriods.oneDay;

    /**
     * Prepare default data for candle requests.
     */
    const startDateOrDefault = (startDate && endDate) ? startDate : defaultStartDate;
    const endDateOrDefault = (startDate && endDate) ? endDate : defaultEndDate;
    const candlestickPeriodOrDefault = candlestickPeriod ? candlestickPeriod : defaultCandlestickPeriod;

    /**
     * Send request for each symbol.
     */
    const observables = symbols.map((symbol) => {
        /**
         * Obtain reversed currency pair which is required by Poloniex API.
         */
        const reversedCurrencyPair = utils.reversePair(symbol);

        /**
         * Start request.
         */
        const request = PoloniexHttpClient.getCandles(
            reversedCurrencyPair,
            startDateOrDefault,
            endDateOrDefault,
            candlestickPeriodOrDefault
        );

        /**
         * Handle response.
         */
        const response = request
            .then(response => response.data);
        
        /**
         * Obtain observable.
         */
        return Rx.Observable.fromPromise(response)
            .map(items => {
                const candles = items.map(i => {
                    return {
                        timestamp: i.date,
                        ..._.pick(i, ['open', 'close', 'high', 'low'])
                    }
                });

                let obj = {};

                _.set(
                    obj,
                    [
                        symbol,
                        periodToString(candlestickPeriodOrDefault)
                    ],
                    _.orderBy(
                        candles,
                        ['timestamp'],
                        ['asc']
                    )
                );

                return obj;
            });
    });

    /**
     * Return observable.
     */
    return Rx.Observable.forkJoin(observables)
            .map(arr => _.assign(...arr));
};

/**
 * Utils for solving small but frequent tasks.
 */
export const utils = {
    
    /**
     * Reverses pair of currencies.
     * 
     * @param {string} currencyPair String with currency pair, e.g. "BTC_STEEM".
     * @return String containing reversed pair of currencies.
     */
    reversePair: (currencyPair) =>
        _.join(
            _.reverse(
                _.split(
                    currencyPair,
                    "_"
                )
            ),
            "_"
        )
};
