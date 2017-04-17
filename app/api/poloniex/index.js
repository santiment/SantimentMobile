/**
 * Created by workplace on 17/04/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'
import axios from 'axios'
import moment from 'moment'

const apiUrl = "https://poloniex.com/public";

export const getTickers = (): any => {
    const url = apiUrl + `?command=returnTicker`;

    const promise = axios.get(url)
        .then(r => r.data);

    return Rx.Observable.fromPromise(promise);
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
export const getCandles = (symbol: string, from: Date, to: Date, period: number): any => {
    const url = apiUrl
        + `?command=returnChartData`
        + `&currencyPair=${symbol}`
        + `&start=${moment(from).unix()}`
        + `&end=${moment(to).unix()}`
        + `&period=${period}`;

    const promise = axios.get(url)
        .then(r => r.data);

    return Rx.Observable.fromPromise(promise);
};

