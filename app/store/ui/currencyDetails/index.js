/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

import MySentimentUiStore from './mySentiment'

export default class CurrencyDetailsUiStore {
    domainStore: any;
    mySentiment: any;
    communitySentiment: any;
    feed: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
        this.mySentiment = new MySentimentUiStore(domainStore);
        this.communitySentiment = undefined;
        this.feed = undefined;
    }

    @computed get title(): string {
        return _.replace(this.domainStore.selectedSymbol, "_", "/");
    }
}
