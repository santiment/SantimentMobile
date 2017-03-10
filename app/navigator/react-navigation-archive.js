/**
 * Created by workplace on 04/02/2017.
 */

'use strict';

import {StackNavigator} from 'react-navigation';

import Currencies from '../scenes/currencies/component';
import CurrencyDetails from '../scenes/currencyDetails/component';
import AddCurrency from '../scenes/addCurrency/component';
import EditCurrencies from '../scenes/editCurrencies/component';

import {CurrenciesRoute, AddCurrencyRoute, CurrencyDetailsRoute, EditCurrenciesRoute} from './routes'

import Store from '../store'

let mainRouteMap =  {};
mainRouteMap[CurrenciesRoute] = {
    screen: Currencies,
    params: {store: Store}
};
mainRouteMap[CurrencyDetailsRoute] = {
    screen: CurrencyDetails,
    params: {store: Store}
};
const MainStack = StackNavigator(
    mainRouteMap,
    { headerMode: 'none' }
);

let appRouteMap = {};
appRouteMap['Index'] = {
    screen: MainStack
};
appRouteMap[AddCurrencyRoute] = {
    screen: AddCurrency,
    params: {store: Store}
};
appRouteMap[EditCurrenciesRoute] = {
    screen: EditCurrencies,
    params: {store: Store}
};

export default StackNavigator(appRouteMap, {
    mode: 'modal',
    initialRouteName: 'Index',
    headerMode: 'none',
});
