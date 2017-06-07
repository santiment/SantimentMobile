/**
 * @flow
 */

import Rx from 'rxjs';
import _ from 'lodash';
import * as CoinMarketCapHttpClient from './httpClient';

/**
 * Downloads ticker.
 *
 * @param {number} limit Limit.
 *      If not passed, default value 50 will be used.
 * @return Observable.
 */
export const getTicker = (
    limit: number = 50,
) => {
    /**
     * Start request.
     */
    const request = CoinMarketCapHttpClient.getTicker(
        limit,
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
            r => _.get(r, 'data', []),
        );
};
