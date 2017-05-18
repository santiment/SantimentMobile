'use strict';

import Rx from 'rxjs';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

/**
 * Base URL for API endpoints.
 */
const apiUrl = "https://sa4h4y6jgb.execute-api.eu-central-1.amazonaws.com/dev";

/**
 * Makes asynchronous request for sentiments by user ID.
 * 
 * @param {*} userId User ID.
 * @return Axios request.
 */
export const getSentiments = (userId: string): any => {
    /**
     * Obtain URL for request.
     */
    let url = apiUrl + `/sentiment?userId=${userId}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url
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
export const postSentiment = (sentiment: Object): any => {
    /*
     * Obtain URL for request.
     */
    let url = apiUrl + `/sentiment`;

    /**
     * Start request and return it.
     */
    return axios.post(
        url,
        sentiment
    );
};

/**
 * Makes asynchronous request for aggregate by asset.
 * 
 * @param {string} asset Currency, e.g. "BTC".
 * @param {Date} startDate Start date.
 * @param {Date} endDate End date.
 * @return Axios request.
 */
export const getAggregate = (asset: string, startDate: Date, endDate: Date): any => {
    /**
     * Obtain parameters for request.
     */
    const dateFormat = 'YYYY-MM-DD';
    const formattedStartDate = moment(startDate).format(dateFormat);
    const formattedEndDate = moment(endDate).format(dateFormat);

    /**
     * Obtain URL for request.
     */
    let url = apiUrl + `/sentiment/aggregate?asset=${asset}&from=${formattedStartDate}&to=${formattedEndDate}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url
    );
};

/**
 * Makes asynchronous request for feed by asset.
 * 
 * @param {string} asset Feed's asset.
 * @return Axios request.
 */
export const getFeed = (asset: string): any => {
    /**
     * Obtain URL for request.
     */
    let url = apiUrl + `/feed?keyword=${asset}`;

    /**
     * Start request and return it.
     */
    return axios.get(
        url
    );
};
