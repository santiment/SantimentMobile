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
 * @return Axios request.
 */
export const postSentiment = (sentiment: Object): any => {
    /*
     * Obtain URL for request.
     */
    let url = apiUrl + `/sentiment`;

    /**
     * Obtain request body.
     */
    const newSentiment = _.assign(
        {
        },
        _.omit(sentiment, 'timestamp'),
        {
            date: moment.unix(sentiment.timestamp).toISOString()
        }
    );

    console.log("sentiment:\n", JSON.stringify(sentiment, null, 2));
    console.log("newSentiment:\n", JSON.stringify(newSentiment, null, 2));

    /**
     * Start request and return it.
     */
    return axios.post(
        url,
        newSentiment
    );
};

/**
 * Makes asynchronous request for aggregate by asset.
 * 
 * @param {string} asset Aggregate's asset.
 * @param {Date} startDate Start date.
 * @param {Date} endDate End date.
 * @return Axios request.
 */
export const getAggregate = (asset: string, startDate: Date, endDate: Date): any => {
    /**
     * Obtain parameters for request.
     */
    const dateFormat = 'YYYY-MM-DD';
    const from = moment(startDate).format(dateFormat);
    const to = moment(endDate).format(dateFormat);

    /**
     * Obtain URL for request.
     */
    let url = apiUrl + `/sentiment/aggregate?asset=${asset}&from=${from}&to=${to}`;

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
