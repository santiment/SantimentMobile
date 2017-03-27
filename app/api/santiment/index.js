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
                {"id": "aaa", "symbol": "BTC/USD", "sentiment": "bullish", "price": 1041, "date": "2017-03-16T23:23:41.229Z"},
                {"id": "bbb", "symbol": "BTC/USD", "sentiment": "bullish", "price": 1043,  "date": "2017-03-17T23:23:41.229Z"},
                {"id": "aAA", "symbol": "ETH/USD", "sentiment": "catish", "price": 1046, "date": "2017-03-14T23:23:41.229Z"},
                {"id": "EEE", "symbol": "ETH/USD", "sentiment": "bearish", "price": 1049, "date": "2017-03-15T23:23:41.229Z"},
                {"id": "GGG", "symbol": "BTC/USD", "sentiment": "catish", "price": 1053, "date": "2017-03-16T23:23:41.229Z"},
                {"id": "ZZZ", "symbol": "ETH/USD", "sentiment": "bearish", "price": 1011, "date": "2017-03-17T23:23:41.229Z"}
            ]
        }];
    })
};
