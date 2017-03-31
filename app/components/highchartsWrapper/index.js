/**
 * Created by workplace on 30/03/2017.
 */

import React from 'react';
import ReactNative from 'react-native';
let {WebView, View, StyleSheet, Dimensions} = ReactNative;

const window = Dimensions.get('window');

export default class HighchartsWrapper extends React.Component {
    // used to resize on orientation of display
    reRenderWebView(e) {
        this.setState({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        })
    }

    render() {
        let config = JSON.stringify(this.props.config, function (key, value) {//create string of json but if it detects function it uses toString()
            return (typeof value === 'function') ? value.toString() : value;
        });
        config = flattenObject(JSON.parse(config));

        const highchartsJs = this.props.stock
            ? '"https://code.highcharts.com/stock/highstock.js"'
            : '"https://code.highcharts.com/highchartsTest.js"';

        const chartMethod = this.props.stock ? 'stockChart' : 'chart';

        const html = `
            <html>
                <style media="screen" type="text/css">
                    #container {
                        width:100%;
                        height:100%;
                        top:0;
                        left:0;
                        right:0;
                        bottom:0;
                        position:absolute;
                    }
                </style>
                <head>
                    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
                    <script src=${highchartsJs}></script>
                    <script src="https://code.highcharts.com/modules/exporting.js"></script>
                    <script>
                    $(function () {
                        Highcharts.${chartMethod}('container',
                            ${config}
                        );
                    });
                    </script>
                </head>
                <body>
                    <div id="container">
                    </div>
                </body>
            </html>
        `;

        console.log("html:\n", html);
        
        
        return (
            <View style={this.props.style}>
                <WebView
                    onLayout={this.reRenderWebView}
                    style={styles.container}
                    source={{ html: html, baseUrl: 'web/' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                />
            </View>
        );
    };
};

const flattenObject = function (obj, str='{') {
    Object.keys(obj).forEach(function(key) {
        str += `${key}: ${flattenText(obj[key])}, `
    });
    return `${str.slice(0, str.length - 2)}}`
};

const flattenText = function(item) {
    let str = '';
    if (item && typeof item === 'object' && item.length == undefined) {
        str += flattenObject(item)
    } else if (item && typeof item === 'object' && item.length !== undefined) {
        str += '[';
        item.forEach(function(k2) {
            str += `${flattenText(k2)}, `
        });
        str = str.slice(0, str.length - 2);
        str += ']';
    } else if(typeof item === 'string' && item.slice(0, 8) === 'function') {
        str += `${item}`;
    } else if(typeof item === 'string') {
        str += `\"${item.replace(/"/g, '\\"')}\"`;
    } else {
        str += `${item}`;
    }
    return str;
};


HighchartsWrapper.propTypes = {
    style: React.PropTypes.any,
    config: React.PropTypes.any.isRequired,
    stock: React.PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'transparent'
    }
});