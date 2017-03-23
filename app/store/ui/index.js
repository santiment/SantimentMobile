/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import {useStrict} from 'mobx'

import DomainStore from '../domain'
import CurrenciesUiStore from './currencies'
import AddCurrencyUiStore from './addCurrencies'
import EditCurrenciesUiStore from './editCurrencies'
import CurrencyDetailsUiStore from './currencyDetails'

export default class UiStore {
    currencies: any;
    addCurrency: any;
    editCurrencies: any;
    currencyDetails: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.currencies = new CurrenciesUiStore(domainStore);
        this.addCurrency = new AddCurrencyUiStore(domainStore);
        this.editCurrencies = new EditCurrenciesUiStore(domainStore);
        this.currencyDetails = new CurrencyDetailsUiStore(domainStore);
    }
}
