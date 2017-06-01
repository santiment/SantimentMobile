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

class AddCurrencyUiStore {

    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @observable query: string = '';
    
    @action setQuery = (query: string): void => {
        this.query = query;
    };

    @action addSymbol = (symbol: string): void => {
        this.domainStore.addSymbol(symbol);
        this.domainStore.refresh()
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

    @computed get rows(): Object[] {
        const symbols: Object[] = _.map(
            this.domainStore.tickers,
            (t) => {
                const symbol = _.get(t, 'symbol');
                return {
                    symbol,
                    displaySymbol: _.replace(symbol, '_', '/'),
                };
            },
        );

        const rows: Object[] = _.filter(symbols, s => _.includes(
            _.toLower(s.displaySymbol),
            _.toLower(this.query),
        ));

        return rows;
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this.ds.cloneWithRows(this.rows.slice());
    }
}

export default AddCurrencyUiStore;
