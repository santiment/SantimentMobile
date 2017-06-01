/**
 * @flow
 */

import _ from 'lodash';

import { ListView } from 'react-native';

import { computed, action, useStrict } from 'mobx';

class EditCurrenciesUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @action removeSymbol = (symbol: string): void => {
        this.domainStore.removeSymbol(symbol);
    };

    @computed get rows(): Object[] {
        return _.map(
            this.domainStore.symbols.slice(),
            s => ({
                symbol: s,
                displaySymbol: _.replace(s, '_', '/'),
            }),
        );
    }

    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    @computed get dataSource(): Object {
        return this.ds.cloneWithRows(this.rows.slice());
    }
}

export default EditCurrenciesUiStore;
