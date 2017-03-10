/**
 * Created by workplace on 22/02/2017.
 * @flow
 */

import React from 'react';
// import ReactNative from 'react-native';
// let {View, Text} = ReactNative;

import {StockLine} from 'react-native-pathjs-charts'
import _ from 'lodash'

export default class ChartPreview extends React.Component {
    render() {

        let options = {
            showAreas: false,
            strokeWidth: 2,
            width: 100,
            height: 70,
            color: '#888888',
            margin: {
                top: 10,
                left: 0,
                bottom: 10,
                right: 0
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: false,
                showLines: false,
                showLabels: false,
                showTicks: false,
                zeroAxis: false,
                orient: 'bottom',
                tickValues: [
                ],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: false,
                showLines: false,
                showLabels: false,
                showTicks: false,
                zeroAxis: false,
                orient: 'left',
                tickValues: [],
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        };

        return (
            <StockLine data={[this.props.data]}
                       options={_.assign(options, this.props.options)}
                       xKey='x'
                       yKey='y'/>
        )
    }
}

ChartPreview.propTypes = {
    data: React.PropTypes.array.isRequired,
    options: React.PropTypes.object,
};

