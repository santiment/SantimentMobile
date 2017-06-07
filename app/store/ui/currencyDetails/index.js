/**
 * @flow
 */

import _ from 'lodash';

import {
    observable,
    computed,
    action,
    useStrict,
} from 'mobx';

import MySentimentUiStore from './mySentiment';

import CommunitySentimentUiStore from './communitySentiment';

import Feed from './feed';

class CurrencyDetailsUiStore {
    
    /**
     * Domain store.
     */
    domainStore: any;

    /**
     * MySentiment UI store.
     */
    mySentiment: any;

    /**
     * CommunitySentiment UI store.
     */
    communitySentiment: any;

    /**
     * Feed UI store.
     */
    feed: any;

    constructor(domainStore: any) {
        useStrict(true);

        /**
         * Initialize stores.
         */
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

    /**
     * Index of currently active tab.
     */
    @observable currentPageIndex: number = 0;

    /**
     * Updates index of active tab.
     *
     * @param {number} index Index of new active tab.
     */
    @action setCurrentPageIndex = (index: number): void => {
        this.currentPageIndex = index;
    }

    /**
     * Shows whether instruction is visible.
     */
    @observable isInstructionVisible: boolean = false;

    /**
     * Updates `isInstructionVisible` flag.
     *
     * @param {boolean} visible New value for `isInstructionVisible` flag.
     */
    @action setInstructionVisible = (visible: boolean): void => {
        this.isInstructionVisible = visible;
    };
}

export default CurrencyDetailsUiStore;
