/**
 * Created by workplace on 18/04/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
const {View, StyleSheet, processColor, Platform, Text} = ReactNative;

import _ from 'lodash'
import moment from 'moment'

import {CombinedChart} from 'react-native-charts-wrapper';

class Chart extends React.Component {
    render() {
        const {style, data} = this.props;

        const xs = _.map(data, o => moment.unix(o.timestamp).format('MMM D'));

        const candlesticks = _.map(data, o => {
            return {shadowH: o.candle.high, shadowL: o.candle.low, open: o.candle.open, close: o.candle.close}
        });

        const bullishSentiments = _.map(data, o => _.isEqual(o.sentiment, "bullish") ? 1 : 0);
        const catishSentiments = _.map(data, o => _.isEqual(o.sentiment, "catish") ? 1 : 0);
        const bearishSentiments = _.map(data, o => _.isEqual(o.sentiment, "bearish") ? 1 : 0);

        const isDataAvailable = !_.isEmpty(xs) && !_.isEmpty(candlesticks);

        const config = {
            xAxis: {
                drawAxisLine: true,
                axisLineColor: processColor('0x777777'),
                axisLineWidth: 1,
                drawGridLines: true,
                gridLineWidth: 1,
                // gridDashedLine: {
                //     lineLength: 10,
                //     spaceLength: 10
                // },
                gridColor: processColor('#77777716'),
                position: 'BOTTOM',
                // avoidFirstLastClipping: true,
                valueFormatter: xs,
                // granularityEnabled: true,
                // granularity: 1,
                // labelCount: 4,
                axisMinimum: -1,
                axisMaximum: xs.length+15,
            },
            yAxis: {
                left: {
                    enabled: false,
                    drawAxisLine: false,
                    axisLineColor: processColor('#777777'),
                    axisLineWidth: 2,
                    drawLabels: false,
                    drawGridLines: false,
                    gridLineWidth: 1,
                    gridColor: processColor('#777777'),
                    axisMaximum: 20,
                    axisMinimum: 0,
                },
                right: {
                    enabled: true,
                    drawAxisLine: true,
                    axisLineColor: processColor('#777777'),
                    axisLineWidth: 1,
                    drawLabels: true,
                    drawGridLines: true,
                    gridLineWidth: 1,
                    // gridDashedLine: {
                    //     lineLength: 10,
                    //     spaceLength: 10
                    // },
                    gridColor: processColor('#77777716'),
                    // axisMaximum: _.max(_.map(candles, c => c.shadowH)) * 1.0,
                    axisMinimum: _.min(_.map(candlesticks, c => c.shadowL)) * 0.98,
                },
            },
            legend: {
                enabled: false,
                textSize: 14,
                form: 'CIRCLE',
                position: 'BELOW_CHART_RIGHT',
                wordWrapEnabled: true
            },
            chartDescription: {
                text: "",
            },
            data: {
                candleData: {
                    dataSets: [{
                        values: candlesticks,
                        label: 'Company A',
                        config: {
                            axisDependency: 'RIGHT',
                            drawValues: false,
                            highlightColor: processColor('#777777'),
                            shadowColor: processColor('#777777'),
                            shadowWidth: 1,
                            shadowColorSameAsCandle: false,
                            increasingColor: processColor('#27aa36'),
                            increasingPaintStyle: 'fill',
                            decreasingColor: processColor('#bb2b27'),
                        },
                    }],
                },
                barData: {
                    dataSets: [
                        {
                            values: bullishSentiments,
                            label: 'Bullish',

                            config: {
                                axisDependency: 'LEFT',
                                drawValues: false,
                                colors: [processColor('#27aa36')],
                            }
                        },
                        {
                            values: catishSentiments,
                            label: 'Catish',

                            config: {
                                axisDependency: 'LEFT',
                                drawValues: false,
                                colors: [processColor('#777777')],
                            }
                        },
                        {
                            values: bearishSentiments,
                            label: 'Bearish',

                            config: {
                                axisDependency: 'LEFT',
                                drawValues: false,
                                colors: [processColor('#bb2b27')],
                            }
                        }
                    ]

                },

            },

        };

        const noDataView = (
            <View style={styles.noData}>
                <Text style={styles.noDataText}>No chart data</Text>
            </View>
        );

        const chartView = (
            <CombinedChart
                data={config.data}
                legend={config.legend}
                xAxis={config.xAxis}
                yAxis={config.yAxis}
                chartDescription={config.chartDescription}
                onSelect={() => {}}
                autoScaleMinMaxEnabled={true}
                zoom={{
                    scaleX: 4,
                    scaleY: 1,
                    xValue: Platform.select({
                        ios: () => { return -9999 },
                        android: () => { return 9999 },
                    })(),
                    yValue: 1,
                    axisDependency: 'RIGHT'
                }}
                touchEnabled={true}
                dragEnabled={true}
                scaleXEnabled={true}
                scaleYEnabled={false}
                scaleEnabled={false}
                pinchZoom={true}
                doubleTapToZoomEnabled={false}
                dragDecelerationEnabled={false}
                // dragDecelerationFrictionCoef={0.99}
                style={styles.chart}
                chartBackgroundColor={processColor('#ffffff')}

            />
        );

        const content = isDataAvailable ? chartView : noDataView;

        return (
            <View style={style}>
                {content}
            </View>
        );
    }
}

Chart.propTypes = {
    style: React.PropTypes.any,
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            timestamp: React.PropTypes.number.isRequired,
            candle: React.PropTypes.shape({
                open: React.PropTypes.number.isRequired,
                high: React.PropTypes.number.isRequired,
                low: React.PropTypes.number.isRequired,
                close: React.PropTypes.number.isRequired,
            }),
            sentiment: React.PropTypes.oneOf(['bullish', 'catish', 'bearish']),
        })
    ),
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
    },
    noData: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 32,
        color: "#999999",
        fontWeight: "500",
    },
});

export default Chart;