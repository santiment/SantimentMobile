/**
 * Created by workplace on 22/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'
import axios from 'axios'
import moment from 'moment'

const apiUrl = "https://sa4h4y6jgb.execute-api.eu-central-1.amazonaws.com/dev";

const processAndRethrow = error => {
    const unknownError = {
        "error": "UnknownError",
        "message": "Unknown Error",
        "details": [
            "Something unexpected happened. Please try again later.",
        ],
        "status": "418"
    };

    throw (error.response ? _.assign(error.response.data, {status: error.response.status}) : unknownError)
};

export const getSentiment = (userId: string): any => {
    let url = apiUrl + `/sentiment?userId=${userId}`;

    const promise = axios.get(url)
        .then(r => r.data)
        .catch(processAndRethrow);

    return Rx.Observable.fromPromise(promise);
};

export const postSentiment = (sentiment: Object): any => {
    let url = apiUrl + `/sentiment`;

    const promise = axios.post(url, sentiment)
        .then(r => r.data)
        .catch(processAndRethrow);

    return Rx.Observable.fromPromise(promise);
};

export const getAggregate = (asset: string): any => {
    const from = moment().format('YYYY-MM-DD');
    const to = moment().add(1, 'days').format('YYYY-MM-DD');

    let url = apiUrl + `/sentiment/aggregate?asset=${asset}&from=${from}&to=${to}`;

    const promise = axios.get(url)
        .then(r => r.data)
        .catch(processAndRethrow);

    return Rx.Observable.fromPromise(promise);
};