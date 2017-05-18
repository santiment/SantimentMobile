/**
 * Created by workplace on 22/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash';
import Rx from 'rxjs';
import axios from 'axios';
import moment from 'moment';
import * as SantimentHttpClient from './httpClient.js';

/**
 * Handles error.
 * 
 * @param {*} error Error to process.
 */
const processAndRethrow = error => {
    const unknownError = {
        "error": "UnknownError",
        "message": "Unknown Error",
        "details": [
            "Something unexpected happened. Please try again later.",
        ],
        "status": "418"
    };

    throw (
        error.response
            ? _.assign(error.response.data, {status: error.response.status})
            : unknownError
    );
};

/**
 * Downloads sentiment by user ID.
 * 
 * @param {String} userId User ID.
 * @return Observable.
 */
export const getSentiments = (userId: string): any => {
    /**
     * Start request.
     */
    const request = SantimentHttpClient.getSentiments(
        userId
    );

    /**
     * Handle response.
     */
    const response = request
        .then(response => response.data)
        .catch(processAndRethrow);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response)
        // TODO: Should be async but causes bug in conjunction with Observable.forkJoin.
        // TODO: Sometimes it doesn't fire and forkJoin never finishes
        // .observeOn(Rx.Scheduler.async)
        .map(
            sentiments => _.map(
                sentiments,
                s => _.assign({}, _.omit(s, 'date'), {timestamp: moment(s.date).unix()})
            )
        );
};

/**
 * Creates new sentiment on server side.
 * 
 * @param {Object} sentiment Sentiment.
 * @return Observable.
 */
export const postSentiment = (sentiment: Object): any => {
    /**
     * Prepare sentiment in format required by server API.
     */
    const formattedSentiment = _.assign(
        {
        },
        _.omit(sentiment, 'timestamp'),
        {
            date: moment.unix(sentiment.timestamp).toISOString()
        }
    );

    console.log("sentiment:\n", JSON.stringify(sentiment, null, 2));
    console.log("server side sentiment:\n", JSON.stringify(formattedSentiment, null, 2));

    /**
     * Start request.
     */
    const request = SantimentHttpClient.postSentiment(
        formattedSentiment
    );

    /**
     * Handle response.
     */
    const response = request
        .then(response => response.data)
        .catch(processAndRethrow);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response)
        .do(console.log);
};

/**
 * Downloads aggregates for specified currency pairs and date interval.
 * 
 * @param {string[]} symbols Array of currency pairs, e.g. ["BTC_STEEM", "BTC_USDT"].
 *      Should contain at least one currency pair.
 * @param {Date} startDate Aggregate's start date.
 * @param {Date} endDate Aggregate's end date.
 * @return Observable.
 */
export const getAggregates = (symbols: string[], startDate: Date, endDate: Date): any => {
    /**
     * Prepare data for aggregate requests.
     */
    const startDateOrDefault = startDate ? startDate : new Date();
    const endDateOrDefault = endDate ? endDate : moment().add(1, 'days').toDate();

    /**
     * Send request for each aggregate.
     */
    const observables = symbols.map((symbol) => {
        /**
         * Start request.
         */
        const request = SantimentHttpClient.getAggregate(
            symbol,
            startDateOrDefault,
            endDateOrDefault
        );

        /**
         * Handle response.
         */
        const response = request
            .then(response => response.data)
            .catch(processAndRethrow);
        
        /**
         * Obtain observable.
         */
        return Rx.Observable.fromPromise(response)
            .map(items => {
                let obj = {};
                _.set(obj, [symbol], items);

                return obj;
            });
    });

    /**
     * Return observable.
     */
    return Rx.Observable.forkJoin(observables)
        .map(arr => _.assign(...arr));
};

/**
 * Downloads feed by asset.
 * 
 * @param {String} asset Feed's asset.
 * @return Observable.
 */
export const getFeed = (asset: string): any => {
    /**
     * Start request.
     */
    const request = SantimentHttpClient.getFeed(
        asset
    );

    /**
     * Handle response.
     */
    const response = request
        .then(response => response.data)
        .catch(processAndRethrow);

    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(response);
};
