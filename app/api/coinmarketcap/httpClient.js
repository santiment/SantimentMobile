/**
 * @flow
 */

import axios from 'axios';

/**
 * Base URL for API endpoints.
 */
const apiUrl = 'https://api.coinmarketcap.com/v1';

/**
 * Makes asynchronous request for ticker.
 * @param {number} limit Limit.
 * @return Axios request.
 */
export const getTicker = (
    limit: Number,
) => {
    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}/ticker?limit=${limit}`;

    /**
     * Start request and return it.
     */
    return axios.get(url);
};
