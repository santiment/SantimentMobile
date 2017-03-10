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
import Header from './header'

@observer
export default class Currencies extends React.Component {
    componentDidMount() {
        const {store} = this.props;

        store.fetchTickers();
    }

    render() {
        const {navigator, store} = this.props;

        const renderRow = (rowData, sectionID) => {
            return (
                <Cell
                    symbol={_.get(rowData, 'symbol', 'Undefined')}
                    priceUSD={'$' + parseFloat(_.get(rowData, 'price_usd', 0.0)).toPrecision(4) }
                    priceBTC={parseFloat(_.get(rowData, 'price_btc', 0.0)).toPrecision(4) + ' BTC' }
                    onPress={ () => navigator.push({
                        name: CurrencyDetailsRoute,
                        currency: rowData,
                    })}
                />

            )
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
                            onPress={ () => { navigator.push({name: EditCurrenciesRoute})}}
                        />
                    }
                />

                <Header/>

                <ListView
                    style={styles.listView}
                    renderRow={renderRow}
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
                        onPress={ () => navigator.push({ name:AddCurrencyRoute }) }
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
        backgroundColor: '#f8f9fa',
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
    }
});
