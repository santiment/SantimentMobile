/**
 * @flow
 */

import _ from 'lodash';

import {
    ListView,
    Alert,
} from 'react-native';

import {
    observable,
    computed,
    action,
    useStrict,
} from 'mobx';

import * as Santiment from '../../api/santiment';

class CurrenciesUiStore {

    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable isLoading: Boolean = false;

    @action setIsLoading = (value: Boolean): void => {
        this.isLoading = value;
    };

    @action refresh = (): void => {
        this.domainStore.refreshTickers()
            .subscribe(
                () => {},
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        { text: 'OK', onPress: () => {} },
                    ],
                ),
            );
    };

    @action selectSymbol = (symbol: String): void => {
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
                        { text: 'OK', onPress: () => {} },
                    ],
                ),
            );
    };

    @computed get tickers(): Object[] {
        return _.filter(
            this.domainStore.tickers.slice(),
            t => _.includes(this.domainStore.symbols.slice(), t.symbol),
        );
    }

    @computed get rows(): Object[] {
        return this.tickers.map(t => ({
            symbol: t.symbol,
            displaySymbol: _.replace(t.symbol, '_', '/'),
            dailyChangePercent: t.dailyChangePercent.toFixed(2),
            price: (() => {
                const p = t.price.toPrecision(6);
                if (_.includes(p, 'e') || p.length > 10) {
                    return t.price.toFixed(8);
                }
                return p;
            })(),
            volume: t.volume,
        }));
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this.ds.cloneWithRows(this.rows.slice());
    }

}

export default CurrenciesUiStore;
