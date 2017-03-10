/**
 * Created by workplace on 03/02/2017.
 */

'use strict';

import {AddCurrency} from './index'

export const addCurrency = (currency) => {
    return {type: AddCurrency, currency: currency}
};