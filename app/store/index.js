/**
 * @flow
 */

import { useStrict } from 'mobx';

import DomainStore from './domain';
import UiStore from './ui';

class Store {
    ui: any;
    domain: any;

    constructor() {
        useStrict(true);
        this.domain = DomainStore;
        this.ui = new UiStore(DomainStore);
    }
}

export default new Store();
