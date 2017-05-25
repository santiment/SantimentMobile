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

export const getTickers = (
    symbols: String[]
): any => {
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

export const getCandles = (
    symbol: String,
    period: String,
    limit: Number
): any => {
    const url = apiUrl + `/candles/trade:${period}:${symbol}/hist?limit=${limit}`;

    return Rx.Observable
        .fromPromise(axios.get(url))
        .map(r => _.get(r, 'data', []))
};


// const bfxSymbolMap = _.reduce(
//     this.symbols.slice(),
//     (obj, value) => {
//         return _.set(obj, `t${_.replace(value, "_", "")}`, value);
//     },
//     {}
// );

// return Bitfinex.getTickers(_.keys(bfxSymbolMap))
//     .map(tickers => {
//         return tickers.map(t => {
//             return {
//                 symbol: _.get(bfxSymbolMap, t[0]),
//                 price: t[7],
//                 dailyChangePercent: t[6] * 100,
//                 volume: t[8],
//             }
//         });
//     })

// const bfxSymbol = `t${_.replace(symbol, "_", "")}`;
//
// return Bitfinex.getCandles(bfxSymbol, period, 30)
//     .map(items => {
//         const candles = items.map(item => {
//             return {
//                 timestamp: item[0],
//                 open: item[1],
//                 close: item[2],
//                 high: item[3],
//                 low: item[4],
//                 volume: item[5],
//             }
//         });
//
//         let obj = {};
//         _.set(obj, [symbol, period], _.orderBy(candles, ['timestamp'], ['asc']));
//
//         return obj;
//     })
