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
 * @param {*} userId User ID.
 * @return Observable.
 */
export const getSentiments = (userId: string): any => {
    /**
     * Start request.
     */
    let request = SantimentHttpClient.getSentiments(
        userId
    );

    /**
     * Handle response.
     */
    request = request
        .then(response => response.data)
        .catch(processAndRethrow);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(request)
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
     * Start request.
     */
    let request = SantimentHttpClient.postSentiment(
        sentiment
    );

    /**
     * Handle response.
     */
    request = request
        .then(response => response.data)
        .catch(processAndRethrow);
    
    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(request)
        .do(console.log);
};

/**
 * Downloads aggregate by asset and date interval.
 * 
 * @param {string} asset Aggregate's asset.
 * @param {Date} startDate Aggregate's start date.
 * @param {Date} endDate Aggregate's end date.
 * @return Observable.
 */
export const getAggregate = (asset: string, startDate: Date, endDate: Date): any => {
    /**
     * Obtain time interval.
     */
    const from = startDate ? startDate : new Date();
    const to = endDate ? endDate : moment().add(1, 'days').toDate();

    /**
     * Start request.
     */
    let request = SantimentHttpClient.getAggregate(
        asset,
        from,
        to
    );

    /**
     * Handle response.
     */
    request = request
        .then(response => response.data)
        .catch(processAndRethrow);

    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(request);
};

/**
 * Downloads feed by asset.
 * 
 * @param {*} asset Feed's asset.
 * @return Observable.
 */
export const getFeed = (asset: string): any => {
    /**
     * Start request.
     */
    let request = SantimentHttpClient.getFeed(
        asset
    );

    /**
     * Handle response.
     */
    request = request
        .then(response => response.data)
        .catch(processAndRethrow);

    /**
     * Return observable.
     */
    return Rx.Observable.fromPromise(request);
};
