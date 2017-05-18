'use strict';

import Rx from 'rxjs';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

/**
 * Base URL for API endpoints.
 */
const apiUrl = "https://poloniex.com/public";

/**
 * Makes asynchronous request for tickers.
 * 
 * @return Axios request.
 */
export const getTickers = (): any => {
    /**
     * Obtain URL for request.
     */
    const url = apiUrl + `?command=returnTicker`;

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
 * @param {number} period Period in seconds, e.g. 14400.
 * @return Axios request.
 */
export const getCandles = (symbol: string, startDate: Date, endDate: Date, period: number): any => {
    /**
     * Obtain parameters for request.
     */
    const startTimestampInSeconds = moment(startDate).unix();
    const endTimestampInSeconds = moment(endDate).unix();

    /**
     * Obtain URL for request.
     */
    const url = apiUrl
        + `?command=returnChartData`
        + `&currencyPair=${symbol}`
        + `&start=${startTimestampInSeconds}`
        + `&end=${endTimestampInSeconds}`
        + `&period=${period}`;
    
    /**
     * Start request and return it.
     */
    return axios.get(url);
};
