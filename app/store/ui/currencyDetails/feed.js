/**
 * Created by workplace on 14/04/2017.
 * @flow
 */

'use strict';

import _ from 'lodash'

import ReactNative from 'react-native';
const {ListView, Alert} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx'

import moment from 'moment'

export default class FeedUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @action refresh = (): void => {
        this.domainStore.refresh()
            .subscribe(
                () => {},
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        {text: 'OK', onPress: () => {}},
                    ]
                ),
            );
    };

    @computed get asset(): string {
        return _.split(this.domainStore.selectedSymbol, '_')[0]
    }

    @computed get feed(): Object[] {
        const feed = _.get(this.domainStore.feeds, [this.asset], []);

        const formattedFeed = _.map(_.orderBy(feed, ['timestamp'], ['desc']), m => {
           return {
               _id: m.timestamp,
               text: m.message,
               createdAt: new Date(m.timestamp*1000),
               user: {
                   _id: m.username,
                   name: m.username,
               }
           }
        });

        console.log("formattedFeed:\n", JSON.stringify(formattedFeed, null, 2));

        return formattedFeed
    }
}


