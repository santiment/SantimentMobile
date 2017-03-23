/**
 * Created by workplace on 06/02/2017.
 * @flow
 */

'use strict';


import _ from 'lodash'

import Rx from 'rxjs'
import axios from 'axios'

const apiUrl = "https://api.coinmarketcap.com/v1";

// add types
export const getTicker = () => {
    let url = apiUrl + "/ticker?limit=50";

    return Rx.Observable
        .fromPromise(axios.get(url))
        .catch(Rx.Observable.empty)
        .map(r => _.get(r, 'data', []))
};