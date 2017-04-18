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

        const formattedXs = _.map(data, o => moment.unix(o.x).format('MMM Do'));

        const candles = _.map(data, o => {
            return {shadowH: o.high, shadowL: o.low, open: o.open, close: o.close}
        });

        const config = {
            xAxis: {
                drawAxisLine: true,
                axisLineColor: processColor('gray'),
                axisLineWidth: 1,
                drawGridLines: true,
                gridLineWidth: 0.2,
                gridDashedLine: {
                    lineLength: 10,
                    spaceLength: 10
                },
                gridColor: processColor('gray'),
                position: 'BOTTOM',
                avoidFirstLastClipping: true,
                valueFormatter: formattedXs,
                granularityEnabled: true,
                granularity: 1,
                labelCount: 4,
            },
            yAxis: {
                left: {
                    enabled: false,
                    drawAxisLine: false,
                    axisLineColor: processColor('green'),
                    axisLineWidth: 2,
                    drawGridLines: false,
                    gridLineWidth: 1,
                    gridColor: processColor('green'),
                },
                right: {
                    enabled: true,
                    drawAxisLine: true,
                    axisLineColor: processColor('gray'),
                    axisLineWidth: 1,
                    drawGridLines: true,
                    gridLineWidth: 0.2,
                    gridDashedLine: {
                        lineLength: 10,
                        spaceLength: 10
                    },
                    gridColor: processColor('gray'),
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
                        values: candles,
                        label: 'Company A',
                        config: {
                            axisDependency: 'RIGHT',
                            drawValues: false,
                            highlightColor: processColor('darkgray'),
                            shadowColor: processColor('black'),
                            shadowWidth: 1,
                            shadowColorSameAsCandle: true,
                            increasingColor: processColor('green'),
                            increasingPaintStyle: 'fill',
                            decreasingColor: processColor('red'),
                        },
                    }],
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
                    zoom={{scaleX: 4, scaleY: 1, xValue: 0, yValue: 0, axisDependency: 'RIGHT'}}
                    touchEnabled={true}
                    dragEnabled={true}
                    scaleXEnabled={true}
                    scaleYEnabled={false}
                    scaleEnabled={false}
                    pinchZoom={false}
                    doubleTapToZoomEnabled={false}
                    dragDecelerationEnabled={false}
                    // dragDecelerationFrictionCoef={0.99}
                    style={{flex: 1}}
                />
            </View>
        );
    }
}

Chart.propTypes = {
    style: React.PropTypes.any,
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            open: React.PropTypes.number.isRequired,
            high: React.PropTypes.number.isRequired,
            low: React.PropTypes.number.isRequired,
            close: React.PropTypes.number.isRequired,
        })
    ),
};

export default Chart;