/**
 * @flow
 */

import _ from 'lodash';

import {
    Alert,
} from 'react-native';

import {
    observable,
    computed,
    useStrict,
    action,
} from 'mobx';

class CommunitySentimentUiStore {
    domainStore: any;

    constructor(domainStore: any) {
        useStrict(true);

        this.domainStore = domainStore;
    }

    @computed get aggregate(): Object {
        const aggregatesForSymbol = _.get(this.domainStore.aggregates, `${this.domainStore.selectedSymbol}`);
        const votes = _.isEmpty(aggregatesForSymbol) ? { bullish: 0, catish: 0, bearish: 0 } : aggregatesForSymbol[0];

        const totalVotes = votes.bullish + votes.catish + votes.bearish;

        return {
            ...votes,
            totalVotes,
            bullishPercentage: votes.bullish / totalVotes,
            catishPercentage: votes.catish / totalVotes,
            bearishPercentage: votes.bearish / totalVotes,
            bullishPercentageDisplay: `${((votes.bullish / totalVotes) * 100).toPrecision(2)}%`,
            catishPercentageDisplay: `${((votes.catish / totalVotes) * 100).toPrecision(2)}%`,
            bearishPercentageDisplay: `${((votes.bearish / totalVotes) * 100).toPrecision(2)}%`,

        };
    }

    @observable isLoading: Boolean = false;

    @action setLoading = (value: Boolean): void => {
        this.isLoading = value;
    };

    @action refresh = (): void => {
        this.setLoading(true);

        this.domainStore.refreshAggregates(this.domainStore.symbols)
            .do(
                () => {
                    this.setLoading(false);
                },
            )
            .subscribe(
                () => {
                },
                error => Alert.alert(
                    'Refresh Error',
                    error.toString(),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                            },
                        },
                    ],
                ),
            );
    };
}

export default CommunitySentimentUiStore;
