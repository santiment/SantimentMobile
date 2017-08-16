/**
 * @flow
 */

import axios from 'axios';
import moment from 'moment';
import Environment from '../../config';

/**
 * Base URL for API endpoints.
 */
const apiUrl = Environment.santiment.apiUrl;

/**
 * Makes asynchronous request for sentiments by user ID.
 *
 * @param {*} userId User ID.
 * @return Axios request.
 */
export const getSentiments = (
    userId: string,
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
    symbol: string,
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
    asset: string,
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

/**
 * Subscribes device for push notifications.
 * Requires one of two arguments: iOS token or Android token.
 *
 * @param {string} iOSToken Token for iOS device.
 * @param {string} androidToken Token for Android device.
 */
export const subscribeDevice = (
    iOSToken?: string,
    androidToken?: string,
): any => {
    /**
     * Obtain URL for request.
     */
    const url = `${apiUrl}/push/subscribe`;

    /**
     * Prepare data for request's body.
     */
    const data = {
        ios: {
            token: iOSToken,
        },
        android: {
            token: androidToken,
        },
    };

    /**
     * Start request and return it.
     */
    return axios.post(
        url,
        data,
        null,
    );
};
