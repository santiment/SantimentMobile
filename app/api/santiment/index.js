/**
 * Created by workplace on 22/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'
import Rx from 'rxjs'
import axios from 'axios'

const apiUrl = "https://sa4h4y6jgb.execute-api.eu-central-1.amazonaws.com/dev";

export const getSentiment = (userId: string): any => {
    let url = apiUrl + `/sentiment?userId=${userId}`;

    return Rx.Observable
        .fromPromise(axios.get(url))
        .map(r => _.get(r, 'data', []));
};

export const postSentiment = (sentiment: Object, userId: string): any => {
    let url = apiUrl + `/sentiment?userId=${userId}`;

    return Rx.Observable
        .fromPromise(axios.post(url, sentiment))
        .map(r => _.get(r, 'data', []));
};