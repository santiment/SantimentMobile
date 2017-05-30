/**
 * @flow
 */

import React from 'react';
import { Navigator, View } from 'react-native';

import Currencies from '../scenes/currencies';
import CurrencyDetails from '../scenes/currencyDetails';
import AddCurrency from '../scenes/addCurrency';
import EditCurrencies from '../scenes/editCurrencies';

import { CurrenciesRoute, AddCurrencyRoute, CurrencyDetailsRoute, EditCurrenciesRoute } from './routes';

const propTypes = {
    store: React.PropTypes.shape({
        ui: React.PropTypes.shape({
            currencies: React.PropTypes.Object.isRequired,
            currencyDetails: React.PropTypes.Object.isRequired,
            addCurrency: React.PropTypes.Object.isRequired,
            editCurrencies: React.PropTypes.Object.isRequired,
        }).isRequired,
    }).isRequired,
};

class AppNavigator extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <Navigator
                style={{ flex: 1 }}
                configureScene={(route, routeStack) => {
                    if (route.name === AddCurrencyRoute || route.name === EditCurrenciesRoute) {
                        return {
                            ...Navigator.SceneConfigs.FloatFromBottom,
                            gestures: {},
                        };
                    }
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                    case CurrenciesRoute:
                        return <Currencies navigator={navigator} store={store.ui.currencies} />;
                    case CurrencyDetailsRoute:
                        return <CurrencyDetails navigator={navigator} store={store.ui.currencyDetails} />;
                    case AddCurrencyRoute:
                        return <AddCurrency navigator={navigator} store={store.ui.addCurrency} />;
                    case EditCurrenciesRoute:
                        return <EditCurrencies navigator={navigator} store={store.ui.editCurrencies} />;
                    default:
                        return <View />;
                    }
                }}
                initialRoute={{ name: CurrenciesRoute }}
            />
        );
    }
}

AppNavigator.propTypes = propTypes;

export default AppNavigator;
