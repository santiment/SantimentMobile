/**
 * @flow
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scrollview';
import { observer } from 'mobx-react/native';
import NavigationBar from 'react-native-navbar';
import AndroidBackButton from 'android-back-button';

import Cell from './cell';

import getStyles from './styles';

const propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired,
    }).isRequired,
    store: React.PropTypes.shape({
        addSymbol: React.PropTypes.func.isRequired,
        setQuery: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.any.isRequired,
    }).isRequired,
};

@observer
class AddCurrency extends React.PureComponent {

    render() {
        const {
            navigator,
            store,
        } = this.props;

        const styles = getStyles();

        const renderRow = (data, sectionID) => (
            <Cell
                key={sectionID}
                symbol={data.displaySymbol}
                onPress={() => {
                        /**
                         * Update Add Currency UI Store.
                         */
                    store.addSymbol(data.symbol);
                    store.setQuery('');

                        /**
                         * Update domain store.
                         */
                    store.domainStore.refreshTickers();
                    store.domainStore.refreshAggregates(
                            [data.symbol],
                        );

                        /**
                         * Navigate to previous scene.
                         */
                    navigator.pop();
                }}
            />
            );

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={{ title: 'Add Currency' }}
                    leftButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="close"
                            onPress={() => {
                                navigator.pop();
                                store.setQuery('');
                            }}
                        />
                    }
                />

                <SearchBar
                    lightTheme
                    onChangeText={store.setQuery}
                    placeholder="Search Coins"
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <KeyboardAwareListView
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    style={styles.listView}
                    renderRow={renderRow}
                    dataSource={store.dataSource}
                    enableEmptySections
                    removeClippedSubviews={false}
                />

                <AndroidBackButton
                    onPress={() => {
                        navigator.pop();
                        store.setQuery('');
                        return true;
                    }}
                />
            </View>
        );
    }
}

AddCurrency.propTypes = propTypes;

export default AddCurrency;
