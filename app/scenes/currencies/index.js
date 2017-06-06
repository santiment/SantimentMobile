/**
 * Created by workplace on 29/01/2017.
 * @flow
 */


import React from 'react';

import {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet,
} from 'react-native';

import {
    Icon,
    Button,
} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

import _ from 'lodash';

import moment from 'moment';

import {
    observer,
} from 'mobx-react/native';

import {
    AddCurrencyRoute,
    CurrencyDetailsRoute,
    EditCurrenciesRoute,
} from '../../navigator/routes';

import Cell from './cell';

import Palette from '../../resources/colors';

const propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired,
    }).isRequired,
    store: React.PropTypes.shape({
        refresh: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.any.isRequired,
        dataSource: React.PropTypes.any.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Palette.silver,
    },
    listView: {
        backgroundColor: Palette.whiteSmoke,
        flex: 1,
        marginTop: 0,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    toolbarButton: {
        padding: 10,
    },
    header: {
        height: 20,
    },
    footer: {
        /**
         * Height includes offset (20 points)
         * and height of floating action button
         * (52 points).
         */
        height: 20 + 52,
    },
    separator: {
        height: 20,
    },
    noData: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 32,
        color: Palette.dustyGray,
        fontWeight: '500',
    },
    noDataButton: {
        width: 250,
        height: 40,
        margin: 20,
    },
});

@observer
class Currencies extends React.PureComponent {
    render() {
        const { navigator, store } = this.props;

        const renderRow = (data, sectionID, rowID) => (
            <Cell
                symbol={data.displaySymbol}
                price={data.price}
                dailyChangePercent={data.dailyChangePercent}
                onPress={() => {
                    store.selectSymbol(data.symbol);
                    navigator.push({ name: CurrencyDetailsRoute });
                }}
                onVote={(sentiment) => {
                    store.selectSymbol(data.symbol);
                    store.addSentiment({
                        asset: data.symbol,
                        price: data.price,
                        sentiment,
                        timestamp: moment().unix(),
                    });
                    navigator.push({ name: CurrencyDetailsRoute });
                }}
            />

            );

        const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
            <View key={rowID} style={styles.separator} />
        );

        const addCurrency = () => {
            navigator.push({ name: AddCurrencyRoute });
        };

        const isEmpty = _.isEmpty(store.tickers.slice());

        const noDataView = (
            <View style={styles.noData}>
                <Text style={styles.noDataText}>Nothing here.</Text>
                <Button
                    raised
                    buttonStyle={styles.noDataButton}
                    textStyle={{ textAlign: 'center' }}
                    title={'Add coins'}
                    backgroundColor={Palette.forestGreen}
                    fontSize={20}
                    onPress={addCurrency}
                />
            </View>
        );

        const listView = (
            <ListView
                style={styles.listView}
                renderRow={renderRow}
                renderHeader={() => <View style={styles.header} />}
                renderFooter={() => <View style={styles.footer} />}
                renderSeparator={renderSeparator}
                dataSource={store.dataSource}
                enableEmptySections
                removeClippedSubviews={false}
                refreshControl={
                    <RefreshControl
                        refreshing={store.isLoading}
                        onRefresh={store.refresh}
                    />
                }
            />
        );

        const contentView = isEmpty ? noDataView : listView;

        return (
            <View style={styles.container}>

                <NavigationBar
                    title={{ title: 'Currencies' }}
                    style={styles.navBar}
                    rightButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="mode-edit"
                            onPress={() => {
                                navigator.push({ name: EditCurrenciesRoute });
                            }}
                        />
                    }
                />

                {contentView}

                <View style={styles.fabContainer}>

                    <Icon
                        raised
                        reverse
                        name="add"
                        color={Palette.forestGreen}
                        onPress={addCurrency}
                    />

                </View>

            </View>
        );
    }
}

Currencies.propTypes = propTypes;

export default Currencies;

