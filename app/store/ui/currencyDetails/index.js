/**
 * @flow
 */

import _ from 'lodash';

import {
    computed,
    action,
    useStrict,
} from 'mobx';

import MySentimentUiStore from './mySentiment';
import CommunitySentimentUiStore from './communitySentiment';
import Feed from './feed';

class CurrencyDetailsUiStore {
    domainStore: any;
    mySentiment: any;
    communitySentiment: any;
    feed: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
        this.mySentiment = new MySentimentUiStore(domainStore);
        this.communitySentiment = new CommunitySentimentUiStore(domainStore);
        this.feed = new Feed(domainStore);
    }

    @action refresh = (): void => {
    };

    @computed get title(): string {
        return _.replace(this.domainStore.selectedSymbol, '_', '/');
    }
}

export default CurrencyDetailsUiStore;
