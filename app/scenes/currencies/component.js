/**
 * Created by workplace on 29/01/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {ListView, View, StyleSheet, RefreshControl} = ReactNative;

import {Icon} from 'react-native-elements'
import NavigationBar from 'react-native-navbar'

import _ from 'lodash'

import {observer} from 'mobx-react/native'


import {AddCurrencyRoute, CurrencyDetailsRoute, EditCurrenciesRoute} from '../../navigator/routes'
import Cell from './cell'

@observer
export default class Currencies extends React.Component {
    componentDidMount() {
        const {store} = this.props;

        // store.fetchTickers();
    }

    render() {
        const {navigator, store} = this.props;

        const renderRow = (rowData, sectionID) => {
            return (
                <Cell
                    symbol={_.get(rowData, 'symbol', 'Undefined')}
                    priceUSD={parseFloat(parseFloat(_.get(rowData, 'price_usd', "0.0")).toPrecision(4)) }
                    change24h={parseFloat(_.get(rowData, 'percent_change_24h', 0.0))}
                    onPress={ () => navigator.push({
                        name: CurrencyDetailsRoute,
                        currency: rowData,
                    })}
                />

            )
        };

        const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
            return (<View key={rowID} style={styles.separator}/>)
        };

        return (
            <View style={styles.container}>

                <NavigationBar
                    title={{title: "Currencies"}}
                    style={styles.navBar}
                    rightButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="mode-edit"
                            onPress={ () => {
                                navigator.push({name: EditCurrenciesRoute})
                            }}
                        />
                    }
                />

                <ListView
                    style={styles.listView}
                    renderRow={renderRow}
                    renderHeader={() => <View style={styles.header}/>}
                    renderFooter={() => <View style={styles.footer}/>}
                    renderSeparator={renderSeparator}
                    dataSource={store.currenciesDS}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={store.isLoading}
                            onRefresh={store.fetchTickers}
                        />
                    }
                />


                <View style={styles.fabContainer}>

                    <Icon
                        raised
                        reverse
                        name="add"
                        color="green"
                        onPress={ () => navigator.push({name: AddCurrencyRoute}) }
                    />

                </View>

            </View>
        );
    }
}

Currencies.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        fetchTickers: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.any.isRequired,
        currenciesDS: React.PropTypes.any.isRequired,
    }),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#cccccc",
    },
    listView: {
        backgroundColor: '#f0f0f0',
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
        height: 20,
    },
    separator: {
        height: 20,
    },
});
