/**
 * @flow
 */

import React from 'react';

import {
    View,
    Text,
    ListView,
    RefreshControl,
} from 'react-native';

import {
    observer,
} from 'mobx-react/native';

import Dropdown from 'react-native-modal-dropdown';

import _ from 'lodash';

import SentimentChart from '../../../components/sentimentCandlestickChart';

import Cell from './cell';

import Palette from '../../../resources/colors';

import getStyles from './styles';

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

@observer
class MySentiment extends React.Component {
    
    render() {
        const {
            store,
        } = this.props;

        const styles = getStyles();

        // eslint-disable-next-line no-unused-vars
        const renderRow = (data, sectionID) => (
            <Cell
                date={data.date}
                price={data.price}
                sentiment={data.sentiment}
            />
        );

        let changeColor;

        if (store.ticker.dailyChangePercent > 0) {
            changeColor = Palette.forestGreenOne;
        } else if (store.ticker.dailyChangePercent < 0) {
            changeColor = Palette.fireBrick;
        } else {
            changeColor = Palette.spunPearl;
        }

        // eslint-disable-next-line no-unused-vars
        const renderDropdownRow = (rowData, rowID, highlighted) => (
            <View style={styles.periodButton}>
                <Text style={styles.periodText}>
                    {rowData}
                </Text>
            </View>
        );

        // eslint-disable-next-line no-unused-vars
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
                                // eslint-disable-next-line no-unused-vars
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
