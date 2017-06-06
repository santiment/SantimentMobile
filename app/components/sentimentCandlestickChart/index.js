/**
 * Created by workplace on 18/04/2017.
 * @flow
 */


import React from 'react';

import {
    View,
    StyleSheet,
    processColor,
    Platform,
    Text,
} from 'react-native';

import _ from 'lodash';

import moment from 'moment';

import {
    CombinedChart,
} from 'react-native-charts-wrapper';

import Palette from '../../resources/colors';

import ColorGenerator from '../../utils/colorGenerator';

const propTypes = {
    style: React.PropTypes.any.isRequired,
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
        }),
    ).isRequired,
};

const styles = StyleSheet.create({
    chart: {
        flex: 1,
    },
    noData: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Palette.mineShaft,
    },
    noDataText: {
        fontSize: 32,
        color: Palette.veryLightGray,
        fontWeight: '500',
    },
});

class Chart extends React.PureComponent {
    render() {
        const { style, data } = this.props;

        const xs = _.map(data, o => moment.unix(o.timestamp).format('MMM D'));

        const candlesticks = _.map(data, o => (
            { shadowH: o.candle.high, shadowL: o.candle.low, open: o.candle.open, close: o.candle.close }
        ));

        const bullishSentiments = _.map(data, o => (_.isEqual(o.sentiment, 'bullish') ? 1 : 0));
        const catishSentiments = _.map(data, o => (_.isEqual(o.sentiment, 'catish') ? 1 : 0));
        const bearishSentiments = _.map(data, o => (_.isEqual(o.sentiment, 'bearish') ? 1 : 0));

        const isDataAvailable = !_.isEmpty(xs) && !_.isEmpty(candlesticks);

        const config = {
            xAxis: {
                drawAxisLine: true,
                textColor: processColor(Palette.veryLightGray),
                axisLineColor: processColor(Palette.veryLightGray),
                axisLineWidth: 1,
                drawGridLines: true,
                gridLineWidth: 1,
                // gridDashedLine: {
                //     lineLength: 10,
                //     spaceLength: 10
                // },
                gridColor: processColor(
                    ColorGenerator.colorWithOpacity(
                        Palette.veryLightGray,
                        0x20,
                    ),
                ),
                position: 'BOTTOM',
                // avoidFirstLastClipping: true,
                valueFormatter: xs,
                // granularityEnabled: true,
                // granularity: 1,
                // labelCount: 4,
                axisMinimum: -1,
                axisMaximum: xs.length + 15,
            },
            yAxis: {
                left: {
                    enabled: false,
                    drawAxisLine: false,
                    axisLineColor: processColor(Palette.veryLightGray),
                    axisLineWidth: 2,
                    drawLabels: false,
                    drawGridLines: false,
                    gridLineWidth: 1,
                    gridColor: processColor(Palette.veryLightGray),
                    axisMaximum: 20,
                    axisMinimum: 0,
                },
                right: {
                    enabled: true,
                    drawAxisLine: true,
                    textColor: processColor(Palette.veryLightGray),
                    axisLineColor: processColor(Palette.veryLightGray),
                    axisLineWidth: 1,
                    drawLabels: true,
                    drawGridLines: true,
                    gridLineWidth: 1,
                    // gridDashedLine: {
                    //     lineLength: 10,
                    //     spaceLength: 10
                    // },
                    gridColor: processColor(
                        ColorGenerator.colorWithOpacity(
                            Palette.veryLightGray,
                            0x20,
                        ),
                    ),
                    // axisMaximum: _.max(_.map(candles, c => c.shadowH)) * 1.0,
                    axisMinimum: _.min(_.map(candlesticks, c => c.shadowL)) * 0.98,
                },
            },
            legend: {
                enabled: false,
                textSize: 14,
                form: 'CIRCLE',
                position: 'BELOW_CHART_RIGHT',
                wordWrapEnabled: true,
            },
            chartDescription: {
                text: '',
            },
            data: {
                candleData: {
                    dataSets: [{
                        values: candlesticks,
                        label: 'Company A',
                        config: {
                            axisDependency: 'RIGHT',
                            drawValues: false,
                            highlightColor: processColor(Palette.boulder),
                            shadowColor: processColor(Palette.boulder),
                            shadowWidth: 1,
                            shadowColorSameAsCandle: false,
                            increasingColor: processColor(Palette.mountainMeadow),
                            increasingPaintStyle: 'fill',
                            decreasingColor: processColor(Palette.amaranthTwo),
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
                                colors: [processColor(Palette.mountainMeadow)],
                            },
                        },
                        {
                            values: catishSentiments,
                            label: 'Catish',

                            config: {
                                axisDependency: 'LEFT',
                                drawValues: false,
                                colors: [processColor(Palette.veryLightGray)],
                            },
                        },
                        {
                            values: bearishSentiments,
                            label: 'Bearish',

                            config: {
                                axisDependency: 'LEFT',
                                drawValues: false,
                                colors: [processColor(Palette.amaranthTwo)],
                            },
                        },
                    ],

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
                autoScaleMinMaxEnabled
                zoom={{
                    scaleX: 4,
                    scaleY: 1,
                    xValue: Platform.select({
                        ios: () => -9999,
                        android: () => 9999,
                    })(),
                    yValue: 1,
                    axisDependency: 'RIGHT',
                }}
                touchEnabled
                dragEnabled
                scaleXEnabled
                scaleYEnabled={false}
                scaleEnabled={false}
                pinchZoom
                doubleTapToZoomEnabled={false}
                dragDecelerationEnabled={false}
                // dragDecelerationFrictionCoef={0.99}
                style={styles.chart}
                chartBackgroundColor={processColor(Palette.mineShaft)}

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

Chart.propTypes = propTypes;

export default Chart;
