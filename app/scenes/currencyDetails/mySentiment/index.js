/**
 * Created by workplace on 31/01/2017.
 * @flow
 */

'use strict';

import React from 'react';

import ReactNative, {
    View,
    Text,
    ListView,
    RefreshControl,
    StyleSheet
} from 'react-native';

import {Icon} from 'react-native-elements';

import NavigationBar from 'react-native-navbar';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

import {observer} from 'mobx-react/native';

import Dropdown from 'react-native-modal-dropdown';

import _ from 'lodash';

import SentimentChart from '../../../components/sentimentCandlestickChart';

import Cell from './cell';

import * as Poloniex from '../../../api/poloniex';

import Clock from '../../../utils/clock.js';

@observer
export default class MySentiment extends React.Component {

    appearanceClock: Clock;

    constructor(props) {
        super(props);

        /**
         * Initialize appearance clock and
         * start to measure time interval.
         */
        this.appearanceClock = new Clock();
        this.appearanceClock.start();

        /**
         * Initialize state.
         */
        this.state = {
            didAppear: false
        };
    }

    componentDidMount() {
        /**
         * Update state.
         */
        this.setState({
            didAppear: true
        });

        /**
         * End to measure appearance time interval.
         */
        const appearanceTimeInterval = this.appearanceClock.stop();

        console.log(
            "MySentiment scene did appear in ",
            appearanceTimeInterval,
            " milliseconds"
        );
    }

    render() {
        if (!this.state.didAppear) {
            return null;
        }

        const {navigator, store} = this.props;

        const renderRow = (data, sectionID) => {
            return (
                <Cell
                    date={data.date}
                    price={data.price}
                    sentiment={data.sentiment}
                />
            )
        };

        const changeColor = store.ticker.dailyChangePercent > 0
            ? "#24e174"
            : store.ticker.dailyChangePercent < 0
                ? "#fd7a57"
                : "#b1b1b2";

        const renderDropdownRow = (rowData, rowID, highlighted) => {
            return (
                <View style={styles.periodButton}>
                    <Text style={styles.periodText}>
                        {rowData}
                    </Text>
                </View>
            );
        };

        const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
            if (_.isEqual(rowID, store.periods.length-1)) return;
            return (
                <View
                    style={styles.periodDropdownSeparator}
                    key={`${rowID}_separator`}
                />
            );
        };

        return (
            <View style={styles.container}>
                
                <SentimentChart
                    data={store.chartData}
                    style={styles.chart}
                />

                <View style={styles.currencyRowContainer}>

                    <View style={styles.priceColumn}>
                        <Text style={[styles.text, styles.priceText]}>
                            {store.ticker.price}
                        </Text>

                        <Text style={[styles.text, styles.changeText, {color: changeColor}]}>
                            {`${store.ticker.dailyChangePercent}%`}
                        </Text>
                    </View>

                    <View style={styles.periodColumn}>
                        <Dropdown
                            style={styles.periodButton}
                            dropdownStyle={[styles.periodDropdown, {height: (store.periods.length*(30+2))}]}
                            textStyle={styles.periodText}
                            options={store.dropdownOptions}
                            onSelect={
                                (index, value) => {
                                    /**
                                     * Update index of selected period in store.
                                     */
                                    const indexOfSelectedPeriod = parseInt(index);
                                    store.setIndexOfSelectedPeriod(indexOfSelectedPeriod);

                                    /**
                                     * Refresh store.
                                     */
                                    //store.refresh();
                                }
                            }
                            defaultValue={store.dropdownDefaultValue}
                            defaultIndex={store.dropdownDefaultIndex}
                            animated={false}
                            renderRow={renderDropdownRow}
                            renderSeparator={renderSeparator}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                </View>

                <View style={styles.listViewContainer}>
                    <ListView
                        renderRow={renderRow}
                        dataSource={store.dataSource}
                        enableEmptySections={true}
                        removeClippedSubviews={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={store.isLoading}
                                onRefresh={store.refresh}
                            />
                        }
                    />
                </View>

            </View>
        );
    }
}

MySentiment.propTypes = {
    navigator: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired,
        pop: React.PropTypes.func.isRequired
    }),
    store: React.PropTypes.shape({
        domainStore: React.PropTypes.any.isRequired,
        periods: React.PropTypes.any.isRequired,
        indexOfSelectedPeriod: React.PropTypes.number.isRequired,
        setIndexOfSelectedPeriod: React.PropTypes.func.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        setIsLoading: React.PropTypes.func.isRequired,
        ticker: React.PropTypes.any.isRequired,
        sentimentsForCurrentSymbol: React.PropTypes.arrayOf(
            React.PropTypes.any
        ).isRequired,
        chartData: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                date: React.PropTypes.string,
                candle: React.PropTypes.shape({
                    open: React.PropTypes.number.isRequired,
                    high: React.PropTypes.number.isRequired,
                    low: React.PropTypes.number.isRequired,
                    close: React.PropTypes.number.isRequired,
                }),
                sentiment: React.PropTypes.string,
            })
        ).isRequired,
        rows: React.PropTypes.arrayOf(
            React.PropTypes.object
        ).isRequired,
        dataSource: React.PropTypes.any.isRequired,
        refresh: React.PropTypes.func.isRequired,
        dropdownOptions: React.PropTypes.arrayOf(
            React.PropTypes.string
        ).isRequired,
        dropdownDefaultValue: React.PropTypes.string.isRequired,
        dropdownDefaultIndex: React.PropTypes.number.isRequired,
    }),
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
        height: responsiveHeight(9),
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333333',
    },
    chartContainer: {
        padding: 20,
        alignItems: 'center',
    },
    toolbarButton: {
        padding: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
    },
    priceColumn: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: "stretch",
    },
    priceText: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: "500",
        color: "#e6e6e6",
    },
    changeText: {
        textAlign: 'left',
    },
    periodColumn: {
        width: 80,
        justifyContent: 'center',
        alignItems: "stretch",
        marginRight: 10,
    },
    periodButton: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        backgroundColor: "#454545",
    },
    periodText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#cdcdcd",
        textAlign: 'center',
    },
    periodDropdown: {
        width: 80,
        backgroundColor: "#454545",
        borderColor: "#333333",
        borderWidth: 2,
    },
    periodDropdownSeparator: {
        height: 2,
        backgroundColor: "#333333",
    },
    spacer: {
        flex: 1,
    },
    listViewContainer: {
        backgroundColor: 'white',
        flex: 1,
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
    },
    chart: {
        height: responsiveHeight(40),
    },
});
