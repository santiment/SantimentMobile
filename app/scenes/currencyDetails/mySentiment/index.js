/**
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
    responsiveHeight,
} from 'react-native-responsive-dimensions';

import { observer } from 'mobx-react/native';

import Dropdown from 'react-native-modal-dropdown';

import _ from 'lodash';

import SentimentChart from '../../../components/sentimentCandlestickChart';

import Cell from './cell';

const propTypes = {
    store: React.PropTypes.shape({
        domainStore: React.PropTypes.any.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        setIsLoading: React.PropTypes.func.isRequired,
        ticker: React.PropTypes.any.isRequired,
        sentimentsForCurrentSymbol: React.PropTypes.arrayOf(
            React.PropTypes.any,
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
            }),
        ).isRequired,
        rows: React.PropTypes.arrayOf(
            React.PropTypes.object,
        ).isRequired,
        dataSource: React.PropTypes.any.isRequired,
        refresh: React.PropTypes.func.isRequired,
        dropdownOptions: React.PropTypes.arrayOf(
            React.PropTypes.string,
        ).isRequired,
        dropdownDefaultValue: React.PropTypes.string.isRequired,
        dropdownDefaultIndex: React.PropTypes.number.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navBar: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cccccc',
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
        fontWeight: '400',
    },
    priceColumn: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    priceText: {
        fontSize: 18,
        textAlign: 'left',
        fontWeight: '500',
        color: '#e6e6e6',
    },
    changeText: {
        textAlign: 'left',
    },
    periodColumn: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginRight: 10,
    },
    periodButton: {
        paddingTop: 5,
        paddingBottom: 5,
        height: 30,
        backgroundColor: '#454545',
    },
    periodText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#cdcdcd',
        textAlign: 'center',
    },
    periodDropdown: {
        width: 80,
        backgroundColor: '#454545',
        borderColor: '#333333',
        borderWidth: 2,
    },
    periodDropdownSeparator: {
        height: 2,
        backgroundColor: '#333333',
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
        marginRight: 20,
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
        backgroundColor: '#999999',
    },
    tabTextStyle: {
        color: '#666666',
    },
    activeTabTextStyle: {
        color: 'white',
    },
    chart: {
        height: responsiveHeight(40),
    },
});

@observer
class MySentiment extends React.Component {
    
    render() {
        const { store } = this.props;

        const renderRow = (data, sectionID) => (
            <Cell
                date={data.date}
                price={data.price}
                sentiment={data.sentiment}
            />
        );

        let changeColor;

        if (store.ticker.dailyChangePercent > 0) {
            changeColor = '#27aa36';
        } else if (store.ticker.dailyChangePercent < 0) {
            changeColor = '#bd2c27';
        } else {
            changeColor = '#b1b1b2';
        }

        const renderDropdownRow = (rowData, rowID, highlighted) => (
            <View style={styles.periodButton}>
                <Text style={styles.periodText}>
                    {rowData}
                </Text>
            </View>
            );

        const renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
            if (_.isEqual(rowID, store.domainStore.periods.length - 1)) return null;
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

                        <Text style={[styles.text, styles.changeText, { color: changeColor }]}>
                            {`${store.ticker.dailyChangePercent}%`}
                        </Text>
                    </View>

                    <View style={styles.periodColumn}>
                        <Dropdown
                            style={styles.periodButton}
                            dropdownStyle={
                                [styles.periodDropdown, { height: (store.domainStore.periods.length * (30 + 2)) }]
                            }
                            textStyle={styles.periodText}
                            options={store.dropdownOptions}
                            onSelect={
                                (index, value) => {
                                    /**
                                     * Update index of selected period in store.
                                     */
                                    const indexOfSelectedPeriod = Number(index);
                                    store.domainStore.setIndexOfSelectedPeriod(indexOfSelectedPeriod);

                                    /**
                                     * Refresh store.
                                     */
                                    store.refresh();
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
                        enableEmptySections
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

MySentiment.propTypes = propTypes;

export default MySentiment;
