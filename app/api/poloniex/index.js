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

/*
 * Candlestick periods.
 */
export const candlestickPeriod_300 = 300;
export const candlestickPeriod_900 = 900;
export const candlestickPeriod_1800 = 1800;
export const candlestickPeriod_7200 = 7200;
export const candlestickPeriod_14400 = 14400;
export const candlestickPeriod_86400 = 86400;

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
    return Rx.Observable.fromPromise(response);
};


// response with Section = "hist"
// [
//     [ MTS, OPEN, CLOSE, HIGH, LOW, VOLUME ],
//     ...
// ]

/**
 *
 * @param symbol: string, e.g. BTC_STEEM
 * @param from: Date
 * @param to: Date
 * @param period: number, e.g. 14400
 * @returns rxjs$Observable.<U>
 *
 * Example:
 * https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=14400
 */

/**
 * Downloads candles.
 * 
 * Response with Section = "hist":
 * [
 *     [ MTS, OPEN, CLOSE, HIGH, LOW, VOLUME],
 *     ...
 * ]
 * 
 * @param {string} symbol Currency pair associated with candles.
 * @param {Date} from Start date.
 * @param {Date} to End date.
 * @param {number} period Period.
 *      Poloniex API allows limited set of periods.
 *      For correct usage, you can take period from
 *      one of `candlestickPeriod_...` constants,
 *      for example: `candlestickPeriod_300`,
 *      `candlestickPeriod_900`, etc.
 * @return Observable.
 */
export const getCandles = (symbol: string, startDate: Date, endDate: Date, period: number): any => {
    /**
     * Start request.
     */
    const request = PoloniexHttpClient.getCandles(
        symbol,
        startDate,
        endDate,
        period
    );

    /**
     * Handle response.
     */
    const response = request
        .then(response => response.data);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response);
};
