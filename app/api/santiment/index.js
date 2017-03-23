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
    return Rx.Observable.of(
        {
            "userId": "TESTUSER",
            "sentiment": [
                {"id": "aaa", "asset": "BTC", "sentiment": "bullish", "date": "2017-03-16T23:23:41.229Z"},
                {"id": "bbb", "asset": "BTC", "sentiment": "bullish", "date": "2017-03-17T23:23:41.229Z"},
                {"id": "aAA", "asset": "ETH", "sentiment": "catish", "date": "2017-03-14T23:23:41.229Z"},
                {"id": "EEE", "asset": "ETH", "sentiment": "bearish", "date": "2017-03-15T23:23:41.229Z"},
                {"id": "GGG", "asset": "ETH", "sentiment": "catish", "date": "2017-03-16T23:23:41.229Z"},
                {"id": "ZZZ", "asset": "ETH", "sentiment": "bearish", "date": "2017-03-17T23:23:41.229Z"}
            ]
        }
    )
};
