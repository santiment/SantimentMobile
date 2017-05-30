/**
 * @flow
 */

import axios from 'axios';
import moment from 'moment';

/**
 * Base URL for API endpoints.
 */
const apiUrl = 'https://sa4h4y6jgb.execute-api.eu-central-1.amazonaws.com/dev';

/**
 * Makes asynchronous request for sentiments by user ID.
 *
 * @param {*} userId User ID.
 * @return Axios request.
 */
export const getSentiments = (
    userId: String,
): any => {
    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}/sentiment?userId=${userId}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url,
    );
};

/**
 * Makes asynchronous request for creating new sentiment on server side.
 *
 * @param {Object} sentiment Sentiment to upload.
 *      Note that this sentiment object should be formatted
 *      according to requirements of server-side API.
 * @return Axios request.
 */
export const postSentiment = (
    sentiment: Object,
): any => {
    /*
     * Obtain URL for request.
     */
    const url = `${apiUrl}/sentiment`;

    /**
     * Start request and return it.
     */
    return axios.post(
        url,
        sentiment,
    );
};

/**
 * Makes asynchronous request for aggregate.
 *
 * @param {string} symbol Currency pair, e.g. "BTC_USDT".
 * @param {Date} startDate Start date.
 * @param {Date} endDate End date.
 * @return Axios request.
 */
export const getAggregate = (
    symbol: String,
    startDate: Date,
    endDate: Date,
): any => {
    /**
     * Obtain parameters for request.
     */
    const dateFormat = 'YYYY-MM-DD';
    const formattedStartDate = moment(startDate).format(dateFormat);
    const formattedEndDate = moment(endDate).format(dateFormat);

    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}/sentiment/aggregate?asset=${symbol}&from=${formattedStartDate}&to=${formattedEndDate}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url,
    );
};

/**
 * Makes asynchronous request for feed by asset.
 *
 * @param {string} asset Feed's asset.
 * @return Axios request.
 */
export const getFeed = (
    asset: String,
): any => {
    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}/feed?keyword=${asset}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url,
    );
};
