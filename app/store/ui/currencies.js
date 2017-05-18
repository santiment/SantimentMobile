/**
 * Created by workplace on 23/03/2017.
 * @flow
 */

'use strict';

import _ from 'lodash';
import Rx from 'rxjs';

import ReactNative from 'react-native';
const {ListView, Alert} = ReactNative;

import mobx, {observable, computed, autorun, action, useStrict} from 'mobx';

import * as Santiment from '../../api/santiment';

export default class CurrenciesUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable isLoading: boolean = false;

    @action setIsLoading = (value: boolean): void => {
        this.isLoading = value;
    };

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

    @action selectSymbol = (symbol: string): void => {
        this.domainStore.setSelectedSymbol(symbol);
    };

    @action addSentiment = (sentiment: Object): void => {
        this.domainStore.addSentiment(sentiment)
            .flatMap(() => Santiment.getSentiments(this.domainStore.user.id))
            .do(s => this.domainStore.setSentiment(s))
            .flatMap(() => Santiment.getAggregates(this.domainStore.symbols))
            .do(a => this.domainStore.setAggregates(a))
            .subscribe(
                () => {},
                error => Alert.alert(
                    'Sentiment Update Error',
                    error.toString(),
                    [
                        {text: 'OK', onPress: () => {}},
                    ]
                )
            )
    };

    @computed get tickers(): Object[] {
        return _.filter(
            this.domainStore.tickers.slice(),
            t => _.includes(this.domainStore.symbols.slice(), t.symbol)
        );
    }
    @computed get rows(): Object[] {

        return this.tickers.map(t => {
            return {
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
            }
        });
    }

    _dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    @computed get dataSource(): Object {
        return this._dataSource.cloneWithRows(this.rows.slice());
    }

}