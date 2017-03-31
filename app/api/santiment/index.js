/**
 * Created by workplace on 22/03/2017.
 * @flow
 */

'use strict';


import _ from 'lodash'
import Rx from 'rxjs'
import axios from 'axios'


// add types
export const getSentiment = () => {
    return Rx.Observable.timer(1000).first().map(() => {
        return [{
            "userId": "TESTUSER",
            "data": [
                {"id": "aaa", "symbol": "BTC_USD", "sentiment": "bullish", "price": 1041, "date": "2017-03-12T23:23:41.229Z"},
                {"id": "bbb", "symbol": "BTC_USD", "sentiment": "bearish", "price": 1043,  "date": "2017-03-18T23:23:41.229Z"},
                {"id": "GGG", "symbol": "BTC_USD", "sentiment": "catish", "price": 1053, "date": "2017-03-20T23:23:41.229Z"},
                {"id": "aAA", "symbol": "ETH_USD", "sentiment": "catish", "price": 43, "date": "2017-03-14T23:23:41.229Z"},
                {"id": "EEE", "symbol": "ETH_USD", "sentiment": "bullish", "price": 45, "date": "2017-03-17T23:23:41.229Z"},
                {"id": "ZZZ", "symbol": "ETH_USD", "sentiment": "bearish", "price": 49, "date": "2017-03-20T23:23:41.229Z"}
            ]
        }];
    })
};
