/**
 * @flow
 */

import axios from 'axios';
import moment from 'moment';

import CandlestickPeriod from '../../utils/candlestickPeriod';

/**
 * Base URL for API endpoints.
 */
const apiUrl = 'https://poloniex.com/public';

/**
 * Makes asynchronous request for tickers.
 *
 * @return Axios request.
 */
export const getTickers = (): any => {
    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}?command=returnTicker`;

    /**
     * Start request and return it.
     */
    return axios.get(url);
};

/**
 * Makes asynchronous request for candles.
 *
 * Example of API request:
 * https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=14400
 *
 * @param {string} symbol Currency pair, e.g. "BTC_STEEM".
 * @param {Date} startDate Start date.
 * @param {Date} endDate End date.
 * @param {CandlestickPeriod} candlestickPeriod Candlestick period.
 * @return Axios request.
 */
export const getCandles = (
    symbol: String,
    startDate: Date,
    endDate: Date,
    candlestickPeriod: CandlestickPeriod,
): any => {
    /**
     * Obtain parameters for request.
     */
    const command = 'returnChartData';
    const startTimestampInSeconds = moment(startDate).unix();
    const endTimestampInSeconds = moment(endDate).unix();
    const candlestickPeriodInSeconds = candlestickPeriod.durationInSeconds;

    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}?command=${command}`
        + `&currencyPair=${symbol}`
        + `&start=${startTimestampInSeconds}`
        + `&end=${endTimestampInSeconds}`
        + `&period=${candlestickPeriodInSeconds}`;

    /**
     * Start request and return it.
     */
    return axios.get(url);
};
