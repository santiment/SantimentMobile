/**
 * Created by workplace on 16/02/2017.
 */

'use strict';


import Currencies from '../scenes/currencies/component';
import CurrencyDetails from '../scenes/currencyDetails/component';
import AddCurrency from '../scenes/addCurrency/component';
import EditCurrencies from '../scenes/editCurrencies/component';

import {CurrenciesRoute, AddCurrencyRoute, CurrencyDetailsRoute, EditCurrenciesRoute} from './routes'

import React from 'react';
import ReactNative from 'react-native';
const {Navigator} = ReactNative;

export default class AppNavigator extends React.Component {
    render() {
        let {store} = this.props;
        return (
            <Navigator
                style={{ flex:1 }}
                configureScene={(route, routeStack) => {
                    if (route.name === AddCurrencyRoute || route.name === EditCurrenciesRoute) {
                        return {
                            ...Navigator.SceneConfigs.FloatFromBottom,
                            gestures: {}
                        }
                    }
                    return Navigator.SceneConfigs.PushFromRight
                }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                        case CurrenciesRoute:
                            return <Currencies navigator={navigator} store={store}/>;
                        case CurrencyDetailsRoute:
                            return <CurrencyDetails navigator={navigator} store={store} currency={route.currency}/>;
                        case AddCurrencyRoute:
                            return <AddCurrency navigator={navigator} store={store}/>;
                        case EditCurrenciesRoute:
                            return <EditCurrencies navigator={navigator} store={store}/>;
                        default:
                            break;
                    }
                }}
                initialRoute={{name: CurrenciesRoute}}
            />
        )
    }
};

AppNavigator.propTypes = {
    store: React.PropTypes.any.isRequired,
};