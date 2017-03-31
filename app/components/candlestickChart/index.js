/**
 * Created by workplace on 29/03/2017.
 * @flow
 */

import React from 'react';

import ChartView from '../highchartsWrapper';

export default class CandlestickChart extends React.Component {
    render() {
        const Highcharts = 'Highcharts';

        let conf = {
            chart: {
                type: 'candlestick',
                animation: false,
                marginRight: 50,
                marginLeft: 0,
                panning: true,
                resetZoomButton: {
                    theme: {
                        display: 'none'
                    }
                },
            },
            title: {
                enabled: false,
            },
            xAxis: {
                type: 'datetime',
                lineWidth: 1,
                gridLineWidth: 1,
                labels: {
                    y: 30,
                    style: {"color": "#666666", "cursor": "default", "fontSize": "10pt"}
                }
            },
            yAxis: {
                lineWidth: 1,
                gridLineWidth: 1,
                labels: {
                    x: 10,
                    align: 'top',
                    style: {"color": "#666666", "cursor": "default", "fontSize": "10pt"}
                }
            },
            tooltip: {
                followTouchMove: false,
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            scrollbar: {
                enabled: false
            },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            series: [
                {
                    name: 'Candlesticks',
                    data: this.props.candlesticks,
                },
                {
                    type: 'Sentiment',
                    data: this.props.sentiments.map(s => { return {
                        x: s.x,
                        title: ' ',
                        fillColor: (() => {
                            switch (s.sentiment) {
                                case "bullish": return "#28aa38";
                                case "catish": return "#b1b1b2";
                                case "bearish": return "#bd2c27";
                                default: return "#ffffff"
                            }
                        })()
                    }}),
                    shape: `circlepin`,
                    lineWidth: 0,
                    height: 2,
                    width: 2,
                    y: -10,
                },
            ]
        };

        return (
            <ChartView
                style={this.props.style}
                config={conf}
                stock={true}
            />
        );
    }
}

CandlestickChart.propTypes = {
    candlesticks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            open: React.PropTypes.number.isRequired,
            high: React.PropTypes.number.isRequired,
            low: React.PropTypes.number.isRequired,
            close: React.PropTypes.number.isRequired,
        })
    ).isRequired,
    sentiments: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            x: React.PropTypes.number.isRequired,
            sentiment: React.PropTypes.string.isRequired,
        })
    ).isRequired,
    style: React.PropTypes.any,
};