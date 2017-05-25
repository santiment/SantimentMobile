/**
 * Created by workplace on 14/04/2017.
 * @flow
 */

'use strict';

import _ from 'lodash';

import ReactNative, {
    ListView,
    Alert
} from 'react-native';

import mobx, {
    observable,
    computed,
    autorun,
    action,
    useStrict
} from 'mobx';

import moment from 'moment';

export default class FeedUiStore {
    
    /**
     * Domain store.
     */
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    /**
     * Updates domain store with information
     * associated with Feed scene.
     */
    @action refresh = (): void => {
        /**
         * Obtain all required information
         * before updating domain store.
         */
        const assetsToUpdate = [
            this.asset
        ];
        
        /**
         * Update feeds for current asset.
         */
        this.domainStore.refreshFeeds(assetsToUpdate)
            .subscribe(
                () => {},
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                            }
                        }
                    ]
                )
            );
    };

    /**
     * Shows whether data is loading now.
     */
    @observable isLoading: Boolean = false;

    /**
     * Updates `isLoading` boolean flag.
     */
    @action setIsLoading = (value: Boolean): void => {
        this.isLoading = value;
    };

    /**
     * Ticker.
     */
    @computed get ticker(): Object {
        const findTicker = (arr) => _.find(arr, t => _.isEqual(t.symbol, this.domainStore.selectedSymbol));
        const formatTicker = (t) => { return {
            symbol: t.symbol,
            displaySymbol: _.replace(t.symbol, "_", "/"),
            dailyChangePercent: t.dailyChangePercent.toFixed(2),
            price: (() => {
                const p = t.price.toPrecision(6);
                if (_.includes(p, "e") || p.length > 10) {
                    return t.price.toFixed(8);
                }
                return p;
            })(),
            volume: t.volume,
        }};

        const getTicker = _.flow(findTicker, formatTicker);

        return getTicker(this.domainStore.tickers);
    }

    /**
     * Asset.
     */
    @computed get asset(): String {
        return _.split(this.domainStore.selectedSymbol, '_')[0]
    }

    /**
     * Feed.
     */
    @computed get feed(): Object[] {
        /**
         * Retrieve feed from domain store.
         */
        const feed = _.get(
            this.domainStore.feeds,
            [this.asset],
            []
        );

        /**
         * Server-side API doesn't return ID for messages.
         * So we will use incremental index as unique ID.
         */
        let messageIndex = 0;

        /**
         * Obtain formatted feed.
         */
        const formattedFeed = _.map(_.orderBy(feed, ['timestamp'], ['desc']), m => {
            /**
             * Obtain unique ID for current message.
             * Currently it's just a message index,
             * but later we can just the algorithm
             * that generates IDs.
             */
            const messageUniqueIdentifier = messageIndex;

            /**
             * Obtain creation date for current message.
             * Timestamp provided by server is measured in seconds,
             * but we need to use milliseconds.
             */
            const messageCreationDate = new Date(m.timestamp * 1000);

            /**
             * Increment index for next message.
             */
            messageIndex++;

            /**
             * Return formatted message object.
             */
            return {
                _id: messageIndex,
                text: m.message,
                createdAt: messageCreationDate,
                user: {
                    _id: m.username,
                    name: m.username,
                }
            }
        });

        /**
         * Console output (helpful for checking feed's content).
         */
        console.log(
            "formattedFeed:\n",
            JSON.stringify(
                formattedFeed,
                null,
                2
            )
        );

        /**
         * Return formatted feed.
         */
        return formattedFeed
    }
}
