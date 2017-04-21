/**
 * Created by workplace on 18/04/2017.
 * @flow
 */

'use strict';

import React from 'react';
import ReactNative from 'react-native';
const {View, StyleSheet, processColor} = ReactNative;

import _ from 'lodash'
import moment from 'moment'

import {CombinedChart} from 'react-native-charts-wrapper';

class Chart extends React.Component {
    render() {
        const {style, data} = this.props;

        const xs = _.map(data, o => moment.unix(o.timestamp).format('MMM Do'));

        const candlesticks = _.map(data, o => {
            return {shadowH: o.candle.high, shadowL: o.candle.low, open: o.candle.open, close: o.candle.close}
        });

        const bullishSentiments = _.map(data, o => _.isEqual(o.sentiment, "bullish") ? 1 : 0);
        const catishSentiments = _.map(data, o => _.isEqual(o.sentiment, "catish") ? 1 : 0);
        const bearishSentiments = _.map(data, o => _.isEqual(o.sentiment, "bearish") ? 1 : 0);

        const config = {
            xAxis: {
                drawAxisLine: true,
                axisLineColor: processColor('gray'),
                axisLineWidth: 1,
                drawGridLines: true,
                gridLineWidth: 0.25,
                gridDashedLine: {
                    lineLength: 10,
                    spaceLength: 10
                },
                gridColor: processColor('gray'),
                position: 'BOTTOM',
                avoidFirstLastClipping: true,
                valueFormatter: xs,
                granularityEnabled: true,
                granularity: 1,
                labelCount: 4,
                axisMinimum: -1,
                axisMaximum: xs.length+15,
            },
            yAxis: {
                left: {
                    enabled: false,
                    drawAxisLine: false,
                    axisLineColor: processColor('green'),
                    axisLineWidth: 2,
                    drawLabels: false,
                    drawGridLines: false,
                    gridLineWidth: 1,
                    gridColor: processColor('green'),
                    axisMaximum: 20,
                    axisMinimum: 0,
                },
                right: {
                    enabled: true,
                    drawAxisLine: true,
                    axisLineColor: processColor('gray'),
                    axisLineWidth: 1,
                    drawLabels: true,
                    drawGridLines: true,
                    gridLineWidth: 0.25,
                    gridDashedLine: {
                        lineLength: 10,
                        spaceLength: 10
                    },
                    gridColor: processColor('gray'),
                    // axisMaximum: _.max(_.map(candles, c => c.shadowH))*1.0,
                    axisMinimum: _.min(_.map(candlesticks, c => c.shadowL))*0.98,
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

        return (
            <View style={style}>
                <CombinedChart
                    data={config.data}
                    legend={config.legend}
                    xAxis={config.xAxis}
                    yAxis={config.yAxis}
                    chartDescription={config.chartDescription}
                    onSelect={() => {}}
                    autoScaleMinMaxEnabled={true}
                    zoom={{scaleX: 4, scaleY: 1, xValue: -9999, yValue: 1, axisDependency: 'RIGHT'}}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={false}
                    scaleEnabled={false}
                    pinchZoom={true}
                    doubleTapToZoomEnabled={false}
                    dragDecelerationEnabled={false}
                    // dragDecelerationFrictionCoef={0.99}
                    style={{flex: 1}}
                    chartBackgroundColor={processColor('#ffffff')}

                />
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

export default Chart;