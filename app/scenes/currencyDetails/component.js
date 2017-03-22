/**
 * Created by workplace on 31/01/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
let {Text, View, StyleSheet, ListView} = ReactNative;

import {Icon} from 'react-native-elements'
import NavigationBar from 'react-native-navbar'

import SegmentedControl from 'react-native-segmented-control-tab'

import _ from 'lodash'

import Chart from '../../components/chart'
import Cell from './cell'

export default class CurrencyDetails extends React.Component {

    render() {
        const {navigator, currency, store} = this.props;

        let data = [
            {"x": 0,"y": 2.5},
            {"x": 1,"y": 2.7},
            {"x": 2,"y": 2.9},
            {"x": 3,"y": 2.95},
            {"x": 4,"y": 3.0},
            {"x": 5,"y": 3.5},
            {"x": 6,"y": 3.4},
            {"x": 7,"y": 3.0},
            {"x": 8,"y": 2.9},
            {"x": 9,"y": 3.0},
            {"x": 10,"y": 2.9},
        ];

        let options = {
            width: 330,
            height: 150,
        };

        const renderRow = (rowData, sectionID) => {
            return (
                <Cell
                    date={_.get(rowData, 'date', "unknown") }
                    priceUSD={'$' + parseFloat(_.get(rowData, 'priceUSD', 0.0)).toPrecision(4) }
                    sentiment={_.get(rowData, 'sentiment', "unknown") }

                />
            )
        };

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={{title: currency.symbol}}
                    style={styles.navBar}
                    leftButton={
                        <Icon
                            containerStyle={styles.toolbarButton}
                            name="keyboard-arrow-left"
                            onPress={ () => {
                                navigator.pop();
                            }}
                        />
                    }
                />

                <View style={styles.currencyRowContainer}>

                    <Text style={[styles.text, {flex: 8}]}>
                        {/*{this.props.priceUSD}*/}
                        $1270
                    </Text>

                    <Text style={[styles.text, {flex: 4, marginRight: 10, textAlign: "right"}]}>
                        +6.13%
                    </Text>

                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                        <View style={styles.sentimentBadge}/>
                    </View>

                </View>

                <SegmentedControl
                    values={['1H', '4H', '1D', '1W']}
                    borderRadius={0}
                    tabsContainerStyle={styles.tabsContainerStyle}
                    tabStyle={styles.tabStyle}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    onTabPress={index => console.log(index)}
                />

                <View style={styles.chartContainer}>

                    <Chart data={data}
                           options={options}/>
                </View>

                <ListView
                    style={styles.listView}
                    renderRow={renderRow}
                    dataSource={store.currencyDetailsDS}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
}

CurrencyDetails.propTypes = {
    navigator: React.PropTypes.object,
    store: React.PropTypes.object,
    currency: React.PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#cccccc",
    },
    currencyRowContainer: {
        height: 50,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    chartContainer: {
        padding: 20,
    },
    toolbarButton: {
        padding: 10,
    },
    text: {
        fontSize: 16,
        color: "#999999",
        fontWeight: "500",
    },
    listView: {
        backgroundColor: 'white',
        padding: 20
    },
    sentimentBadge: {
        margin: 4,
        height: 13,
        width: 13,
        borderRadius: 50,
        backgroundColor: "#98d7b5"
    },
    tabsContainerStyle: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20
    },
    tabStyle: {
        paddingVertical: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#999999',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
    },
    activeTabStyle: {
        backgroundColor: '#999999'
    },
    tabTextStyle: {
        color: '#666666'
    },
    activeTabTextStyle: {
        color: 'white'
    }
});