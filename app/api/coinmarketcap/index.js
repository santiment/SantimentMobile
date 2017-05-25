/**
 * Created by workplace on 06/02/2017.
 * @flow
 */

'use strict';

import Rx from 'rxjs';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import * as CoinMarketCapHttpClient from './httpClient.js';

const apiUrl = "https://api.coinmarketcap.com/v1";

/**
 * Downloads ticker.
 * 
 * @param {number} limit Limit.
 *      If not passed, default value 50 will be used.
 * @return Observable.
 */
export const getTicker = (
    limit: Number = 50
) => {
    /**
     * Start request.
     */
    const request = CoinMarketCapHttpClient.getTicker(
        limit
    );

    /**
     * Handle response.
     */
    const response = request
        .catch(Rx.Observable.empty);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response)
        .map(
            r => _.get(r, 'data', [])
        );
};
