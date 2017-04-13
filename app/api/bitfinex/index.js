/**
 * Created by workplace on 22/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'
import axios from 'axios'

const apiUrl = "https://api.bitfinex.com/v2";

// Response:
// on trading pairs (ex. tBTCUSD)
// [
//  0   SYMBOL,
//  1   BID,
//  2   BID_SIZE,
//  3   ASK,
//  4   ASK_SIZE,
//  5   DAILY_CHANGE,
//  6   DAILY_CHANGE_PERC,
//  7   LAST_PRICE,
//  8   VOLUME,
//  9   HIGH,
//  10  LOW
// ],

export const getTickers = (symbols: string[]): any => {
    const url = apiUrl + `/tickers?symbols=${_.join(symbols, ",")}`;

    return Rx.Observable
        .fromPromise(axios.get(url))
        .map(r => _.get(r, 'data', []));
};


// response with Section = "hist"
// [
//     [ MTS, OPEN, CLOSE, HIGH, LOW, VOLUME ],
//     ...
// ]

export const getCandles = (symbol: string, period: string, limit: number): any => {
    const url = apiUrl + `/candles/trade:${period}:${symbol}/hist?limit=${limit}`;

    return Rx.Observable
        .fromPromise(axios.get(url))
        .map(r => _.get(r, 'data', []))
};
