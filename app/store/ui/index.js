/**
 * @flow
 */

import { useStrict } from 'mobx';

import CurrenciesUiStore from './currencies';
import AddCurrencyUiStore from './addCurrencies';
import EditCurrenciesUiStore from './editCurrencies';
import CurrencyDetailsUiStore from './currencyDetails';

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
